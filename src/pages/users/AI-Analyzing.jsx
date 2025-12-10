"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
    ArrowLeft,
    Wifi,
    Loader2,
    Check,
    CheckCircle2,
    Video,
    Copy,
    Play,
    ChevronDown,
    ChevronRight,
    FileText,
    Download,
    Terminal as TerminalIcon,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "@/libs/axios"
import { QueueLoader } from "@/components/ml/QueueLoader";
import { DownloadLoader } from "@/components/ml/DownloadLoader";
import { WhisperLoader } from "@/components/ml/WhisperLoader";
import { DiarizationLoader } from "@/components/ml/DiarizationLoader";
import { DoneLoader } from "@/components/ml/DoneLoader";

const stageOrder = ["queue", "download", "whisper", "diarization", "done"];

const stageConfig = {
    queue: { label: "Queue" },
    download: { label: "Download" },
    whisper: { label: "Whisper" },
    diarization: { label: "Diarization" },
    done: { label: "Done" },
};


const SPEAKER_COLORS = [
    "border-green-400/30 text-green-400",
    "border-blue-400/30 text-blue-400",
    "border-yellow-400/30 text-yellow-400",
    "border-pink-400/30 text-pink-400",
    "border-purple-400/30 text-purple-400",
];


const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

const getSpeakerColorClass = (speaker, fallbackIndex) => {
    if (!speaker) return SPEAKER_COLORS[fallbackIndex % SPEAKER_COLORS.length];

    // Exam "SPEAKER_00", "SPEAKER_01"
    const match = speaker.match(/(\d+)/);
    const idx = match ? parseInt(match[1], 10) : fallbackIndex;
    return SPEAKER_COLORS[idx % SPEAKER_COLORS.length];
};


export default function AnalyzingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const payloadData = location.state?.payload || [];
    const payloadId = location.state?.payloadId || null;


    const videoQueue = Array.isArray(payloadData)
        ? payloadData.map((v) => {
            const url =
                typeof v === "string"
                    ? v
                    : v.driveUrl ||
                    v.url ||
                    v.drive_url ||
                    v.recordedVideoUrl ||
                    "";

            return {
                name: v.name || v.videoName || v.question || "Unnamed",
                driveUrl: url,
            };
        })
        : [];


    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videoResults, setVideoResults] = useState(
        videoQueue.map((video, index) => ({
            videoIndex: index,
            videoName: video.name,
            driveUrl: video.driveUrl,
            text: "",
            segments: [],
            status: index === 0 ? "processing" : "pending",
            currentStage: index === 0 ? "queue" : undefined,
        }))
    );

    const [logs, setLogs] = useState([]);
    const [copied, setCopied] = useState(null);
    const [expandedVideos, setExpandedVideos] = useState([]);
    const [showTerminal, setShowTerminal] = useState(false);
    const [queuePosition, setQueuePosition] = useState(1);
    const [allComplete, setAllComplete] = useState(false);

    // const currentVideo = videoResults[currentVideoIndex];
    // const allVideoUrls = videoQueue.map(v => v.driveUrl);
    const overallProgress =
        (videoResults.filter((v) => v.status === "done").length / videoResults.length) *
        100 || 0;

    const pushLog = (entry) => {
        setLogs((prev) => [
            ...prev,
            {
                ...entry,
                timestamp: new Date(),
            },
        ]);
    };

    // console.log("videoResults:", allVideoUrls);

    const callDiarizationApi = async (videoUrl, idx) => {
        try {
            const body = {
                payloadId: payloadId,
                urls: [videoUrl],
            };

            pushLog({
                stage: "diarization.request",
                message: `Kirim request diarization untuk video #${idx + 1}`,
            });

            const res = await axiosInstance.post("/ml/transcribe_diarization", body);
            const backend = res.data;

            console.log("🔥 diarization API response:", backend);

            const item = backend?.data?.results?.[0];

            if (!item) {
                pushLog({
                    stage: "diarization.error",
                    message: "Hasil diarization kosong atau invalid",
                });
                return;
            }

            // Jika backend stage = "error"
            if (item.stage === "error") {
                pushLog({
                    stage: "diarization.error",
                    message: item.message || "Diarization gagal",
                });

                setVideoResults(prev => {
                    const updated = [...prev];
                    updated[idx] = {
                        ...updated[idx],
                        status: "error",
                        currentStage: "error",
                        text: "",
                        segments: [],
                        diarization: [],
                        speakers: [],
                        errorMessage: item.message,
                    };
                    return updated;
                });

                return;
            }

            const finalData = item.result || {};

            setVideoResults(prev => {
                const updated = [...prev];
                updated[idx] = {
                    ...updated[idx],
                    status: "done",
                    currentStage: "done",
                    text: finalData.full_text || "",
                    segments: finalData.stt_segments || [],
                    diarization: finalData.diarization_segments || [],
                    speakers: finalData.speakers || [],
                };
                return updated;
            });

            pushLog({
                stage: "diarization.success",
                message: `Video #${idx + 1} selesai diproses`,
                data: finalData,
            });

            return finalData;

        } catch (err) {
            console.error("diarization API error:", err);

            pushLog({
                stage: "diarization.exception",
                message: err?.message || String(err),
            });
        }
    };


    useEffect(() => {
        if (!videoQueue.length) return;

        let cancelled = false;

        const processVideo = async (videoIndex) => {
            const stages = [
                {
                    stage: "queue",
                    code: 102,
                    message: `Kamu berada di antrian ke-${videoIndex + 1}. Tunggu sampai giliranmu diproses.`,
                    delay: 1500,
                },
                {
                    stage: "download",
                    code: 102,
                    message: `URL diterima, mulai download dari Google Drive... [${videoQueue[videoIndex].name}]`,
                    delay: 2500,
                },
                {
                    stage: "whisper",
                    code: 102,
                    message: `File berhasil didownload & audio siap. Mulai proses Whisper... [${videoQueue[videoIndex].name}]`,
                    delay: 3500,
                },
                {
                    stage: "diarization",
                    code: 102,
                    message: `Whisper selesai. Mulai proses diarization... [${videoQueue[videoIndex].name}]`,
                    delay: 500,
                    runApi: true, // flag untuk menjalankan fetch ke BE
                },
                {
                    stage: "done",
                    code: 200,
                    message: `Transcribe + diarization berhasil [${videoQueue[videoIndex].name}]`,
                    delay: 1000,
                },
            ];

            for (const stageData of stages) {
                if (cancelled) return;

                await new Promise((r) => setTimeout(r, stageData.delay));

                setVideoResults((prev) => prev.map((v, i) => (i === videoIndex ? { ...v, currentStage: stageData.stage } : v)));

                pushLog({
                    stage: stageData.stage,
                    message: stageData.message,
                    code: stageData.code,
                    data: stageData.runApi ? { note: "will call diarization API" } : undefined,
                    videoIndex,
                });

                if (stageData.stage === "queue") {
                    setQueuePosition(videoIndex + 1);
                }

                // if diarization stage -> call API
                if (stageData.runApi) {
                    const { text, segments } = await callDiarizationApi(videoQueue[videoIndex].driveUrl, videoIndex);

                    setVideoResults((prev) =>
                        prev.map((v, i) =>
                            i === videoIndex
                                ? {
                                    ...v,
                                    text: text || v.text,
                                    segments: Array.isArray(segments) ? segments : v.segments,
                                }
                                : v
                        )
                    );
                }

                // done stage: mark status done, fill with fallback sample if empty
                if (stageData.stage === "done") {
                    await new Promise((r) => setTimeout(r, 800));

                    setVideoResults((prev) =>
                        prev.map((v, i) =>
                            i === videoIndex
                                ? {
                                    ...v,
                                    status: "done",
                                    currentStage: "done",
                                    text: v.text || `Transcription not available for ${v.videoName}`,
                                    segments: v.segments || [],
                                }
                                : v
                        )
                    );

                    setExpandedVideos((prev) => (prev.includes(videoIndex) ? prev : [...prev, videoIndex]));
                }
            }

            const nextIndex = videoIndex + 1;
            if (nextIndex < videoQueue.length) {
                setCurrentVideoIndex(nextIndex);
                setVideoResults((prev) => prev.map((v, i) => (i === nextIndex ? { ...v, status: "processing", currentStage: "queue" } : v)));
                await new Promise((r) => setTimeout(r, 200));
                processVideo(nextIndex);
            } else {
                setAllComplete(true);
                pushLog({ stage: "all_done", message: "Semua video selesai diproses" });
            }
        };

        processVideo(0);

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once on mount

    const copyTranscript = (videoIndex, text) => {
        try {
            navigator.clipboard.writeText(text);
            setCopied(videoIndex);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.warn("copy failed", err);
        }
    };

    const toggleVideoExpand = (videoIndex) => {
        setExpandedVideos((prev) => (prev.includes(videoIndex) ? prev.filter((i) => i !== videoIndex) : [...prev, videoIndex]));
    };

    const getStageStatus = (video, stage) => {
        if (video.status === "pending") return "pending";
        if (video.status === "done") return "completed";

        const currentIndex = stageOrder.indexOf(video.currentStage || "queue");
        const stageIndex = stageOrder.indexOf(stage);

        if (stageIndex < currentIndex) return "completed";
        if (stageIndex === currentIndex) return "active";
        return "pending";
    };

    const renderStageLoader = (video) => {
        if (video.status !== "processing") return null;

        switch (video.currentStage) {
            case "queue":
                return <QueueLoader position={queuePosition} />;
            case "download":
                return <DownloadLoader name={video.videoName} />;
            case "whisper":
                return <WhisperLoader name={video.videoName} />;
            case "diarization":
                return <DiarizationLoader name={video.videoName} />;
            case "done":
                return <DoneLoader name={video.videoName} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-[calc(100vh-48px)] bg-[#0a1628] text-white">
            <style>{`
        @keyframes waveform {
          0%, 100% { height: 6px; }
          50% { height: 28px; }
        }
      `}</style>

            {/* Header */}
            <div className="border-b border-[#1e3a5f] bg-[#0d1e30]">
                <div className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-3">
                        <Link to="/dashboard/upload">
                            <Button variant="ghost" size="sm" className="text-[#6EACDA] hover:bg-[#1e3a5f] h-7 text-xs">
                                <ArrowLeft className="w-3 h-3 mr-1" />
                                Back
                            </Button>
                        </Link>
                        <div className="h-4 w-px bg-[#1e3a5f]" />
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${allComplete ? "bg-green-400" : "bg-[#6EACDA] animate-pulse"}`} />
                            <span className="text-sm font-medium text-white">SIAS Analyzer</span>
                        </div>
                        <Badge variant="outline" className={`text-[10px] ${allComplete ? "border-green-400/30 text-green-400" : "border-[#6EACDA]/30 text-[#6EACDA]"}`}>
                            {allComplete ? "All Complete" : `Processing ${currentVideoIndex + 1}/${videoQueue.length}`}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#6EACDA]/60">Overall:</span>
                            <div className="w-24 h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#6EACDA] to-green-400 rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }} />
                            </div>
                            <span className="text-[10px] text-[#6EACDA]">{Math.round(overallProgress)}%</span>
                        </div>
                        <Wifi className="w-4 h-4 text-green-400" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-48px-41px)]">
                {/* Left Panel */}
                <div className="w-1/2 border-r border-[#1e3a5f] flex flex-col">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 px-3 py-1.5 border-b border-[#1e3a5f] bg-[#0d1e30]">
                        <button onClick={() => setShowTerminal(false)} className={`px-2.5 py-1 text-[10px] rounded flex items-center gap-1 transition-colors ${!showTerminal ? "bg-[#6EACDA]/20 text-[#6EACDA]" : "text-[#6EACDA]/60 hover:text-[#6EACDA]"}`}>
                            <Sparkles className="w-3 h-3" /> Flow
                        </button>
                        <button onClick={() => setShowTerminal(true)} className={`px-2.5 py-1 text-[10px] rounded flex items-center gap-1 transition-colors ${showTerminal ? "bg-[#6EACDA]/20 text-[#6EACDA]" : "text-[#6EACDA]/60 hover:text-[#6EACDA]"}`}>
                            <TerminalIcon className="w-3 h-3" /> Terminal
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-3">
                        {!showTerminal ? (
                            <div className="space-y-3">
                                {videoResults.map((video, index) => (
                                    <Card key={index} className={`bg-[#0d1e30] border-[#1e3a5f] overflow-hidden transition-all ${index === currentVideoIndex && video.status === "processing" ? "ring-1 ring-[#6EACDA]/50" : ""}`}>
                                        <div className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-[#1e3a5f]/30" onClick={() => video.status === "done" && toggleVideoExpand(index)}>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-7 h-7 rounded flex items-center justify-center ${video.status === "done" ? "bg-green-500/20" : video.status === "processing" ? "bg-[#6EACDA]/20" : "bg-[#1e3a5f]"}`}>
                                                    {video.status === "done" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : video.status === "processing" ? <Loader2 className="w-3.5 h-3.5 text-[#6EACDA] animate-spin" /> : <Video className="w-3.5 h-3.5 text-[#6EACDA]/40" />}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-white">{video.videoName}</p>
                                                    <p className="text-[10px] text-[#6EACDA]/60 truncate max-w-[180px]">{video.driveUrl}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className={`text-[9px] ${video.status === "done" ? "border-green-400/30 text-green-400" : video.status === "processing" ? "border-[#6EACDA]/30 text-[#6EACDA]" : "border-[#1e3a5f] text-[#6EACDA]/40"}`}>
                                                    {video.status === "done" ? "Complete" : video.status === "processing" ? video.currentStage : "Pending"}
                                                </Badge>
                                                {video.status === "done" && (expandedVideos.includes(index) ? <ChevronDown className="w-3.5 h-3.5 text-[#6EACDA]/60" /> : <ChevronRight className="w-3.5 h-3.5 text-[#6EACDA]/60" />)}
                                            </div>
                                        </div>

                                        {/* Processing Stages */}
                                        {video.status === "processing" && (
                                            <div className="border-t border-[#1e3a5f] p-3">
                                                <div className="flex items-center justify-between mb-3">
                                                    {stageOrder.slice(0, -1).map((stage, stageIndex) => {
                                                        const status = getStageStatus(video, stage);
                                                        return (
                                                            <div key={stage} className="flex items-center">
                                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${status === "completed" ? "bg-green-500/20 text-green-400" : status === "active" ? "bg-[#6EACDA]/20 text-[#6EACDA] ring-2 ring-[#6EACDA]/30" : "bg-[#1e3a5f] text-[#6EACDA]/40"}`}>
                                                                    {status === "completed" ? <Check className="w-3 h-3" /> : status === "active" ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className="text-[10px]">{stage[0].toUpperCase()}</span>}
                                                                </div>
                                                                {stageIndex < stageOrder.length - 2 && <div className={`w-8 h-0.5 mx-1 ${status === "completed" ? "bg-green-400/50" : "bg-[#1e3a5f]"}`} />}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="flex justify-between text-[9px] text-[#6EACDA]/60 mb-3 px-1">
                                                    {stageOrder.slice(0, -1).map((stage) => (
                                                        <span key={stage} className="text-center w-12">{stageConfig[stage].label}</span>
                                                    ))}
                                                </div>

                                                <div className="bg-[#0a1628] rounded-lg border border-[#1e3a5f]">
                                                    {renderStageLoader(video)}
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            /* Terminal */
                            <div className="bg-[#0a0a0a] rounded-lg border border-[#1e3a5f] p-3 font-mono text-[10px] h-full overflow-y-auto">
                                <div className="flex items-center gap-1.5 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="ml-2 text-[#6EACDA]/60">sias-analyzer</span>
                                </div>
                                <div className="space-y-1">
                                    {logs.map((log, index) => (
                                        <div key={index} className="flex gap-2">
                                            <span className="text-[#6EACDA]/40">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                            <span className="text-green-400">RECV:</span>
                                            <span className="text-[#6EACDA]">{`{'stage': '${log.stage}', 'message': '${log.message ?? log.stage}'${log.code ? `, 'code': ${log.code}` : ""}${log.data ? `, 'data': ${JSON.stringify(log.data).slice(0, 120)}...` : ""}}`}</span>
                                        </div>
                                    ))}
                                    {!allComplete && (
                                        <div className="flex items-center gap-1 text-[#6EACDA]/60">
                                            <span>Waiting for response</span>
                                            <span className="animate-pulse">...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Transcript Results */}
                <div className="w-1/2 flex flex-col">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1e3a5f] bg-[#0d1e30]">
                        <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-[#6EACDA]" />
                            <span className="text-xs font-medium text-white">Transcript Results</span>
                        </div>
                        <span className="text-[10px] text-[#6EACDA]/60">
                            {videoResults.filter(v => v.status === "done").length}/{videoResults.length} completed
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3">
                        {videoResults.filter(v => v.status === "done").length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 rounded-full bg-[#1e3a5f]/50 flex items-center justify-center mb-3">
                                    <FileText className="w-5 h-5 text-[#6EACDA]/40" />
                                </div>
                                <p className="text-sm text-[#6EACDA]/60">Waiting for transcripts...</p>
                                <p className="text-[10px] text-[#6EACDA]/40 mt-1">Results will appear here when processing is complete</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {videoResults
                                    .filter(v => v.status === "done")
                                    .map(video => (
                                        <Card key={video.videoIndex} className="bg-[#0d1e30] border-[#1e3a5f]">

                                            {/* Header Card */}
                                            <div
                                                onClick={() => toggleVideoExpand(video.videoIndex)}
                                                className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-[#1e3a5f]/30"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                                                    </div>
                                                    <span className="text-xs font-medium text-white">
                                                        {video.videoName}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 px-2 text-[10px] text-[#6EACDA] hover:bg-[#1e3a5f]"
                                                        onClick={e => { e.stopPropagation(); copyTranscript(video.videoIndex, video.text); }}
                                                    >
                                                        {copied === video.videoIndex ? (
                                                            <Check className="w-3 h-3 mr-1" />
                                                        ) : (
                                                            <Copy className="w-3 h-3 mr-1" />
                                                        )}
                                                        {copied === video.videoIndex ? "Copied" : "Copy"}
                                                    </Button>

                                                    {expandedVideos.includes(video.videoIndex) ? (
                                                        <ChevronDown className="w-3.5 h-3.5 text-[#6EACDA]/60" />
                                                    ) : (
                                                        <ChevronRight className="w-3.5 h-3.5 text-[#6EACDA]/60" />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Expanded Detail */}
                                            {expandedVideos.includes(video.videoIndex) && (
                                                <div className="border-t border-[#1e3a5f] p-2.5 space-y-2.5">

                                                    {/* Full Transcript */}
                                                    <div className="bg-[#0a1628] rounded p-2.5">
                                                        <p className="text-[10px] font-medium text-[#6EACDA]/60 mb-1.5">
                                                            Full Transcript
                                                        </p>
                                                        <p className="text-xs text-white/80 leading-relaxed">
                                                            {video.text}
                                                        </p>
                                                    </div>


                                                    {/* Speakers Overview */}
                                                    {Array.isArray(video.speakers) && video.speakers.length > 0 && (
                                                        <div>
                                                            <p className="text-[10px] font-medium text-[#6EACDA]/60 mb-1.5">
                                                                Speakers ({video.speakers.length})
                                                            </p>

                                                            <div className="flex flex-wrap gap-1.5">
                                                                {video.speakers.map((sp, idx) => (
                                                                    <Badge
                                                                        key={sp.speaker ?? idx}
                                                                        variant="outline"
                                                                        className={`text-[9px] py-0.5 px-1.5 ${getSpeakerColorClass(sp.speaker, idx)}`}
                                                                    >
                                                                        <span className="font-semibold mr-1">
                                                                            {sp.speaker || `Speaker ${idx + 1}`}
                                                                        </span>
                                                                        <span className="text-[9px] text-[#6EACDA]/70">
                                                                            {formatTime(sp.total_duration || 0)}
                                                                        </span>
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}


                                                    {/* Segments */}
                                                    <div>
                                                        <p className="text-[10px] font-medium text-[#6EACDA]/60 mb-1.5">
                                                            Segments ({video.segments.length})
                                                        </p>
                                                        <div className="space-y-1.5">
                                                            {video.segments.map((segment, idx) => (
                                                                <div
                                                                    key={segment.id ?? idx}
                                                                    className="flex gap-2 p-2 bg-[#0a1628] rounded hover:bg-[#1e3a5f]/30 transition-colors"
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-5 w-5 p-0 text-[#6EACDA] hover:bg-[#1e3a5f] shrink-0"
                                                                    >
                                                                        <Play className="w-2.5 h-2.5" />
                                                                    </Button>

                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center gap-2 mb-0.5">
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={`text-[8px] py-0 ${segment.speaker === "Interviewer"
                                                                                    ? "border-purple-400/30 text-purple-400"
                                                                                    : "border-green-400/30 text-green-400"
                                                                                    }`}
                                                                            >
                                                                                {segment.speaker ?? `S${idx + 1}`}
                                                                            </Badge>

                                                                            <span className="text-[9px] text-[#6EACDA]/40">
                                                                                {formatTime(segment.start)} - {formatTime(segment.end)}
                                                                            </span>
                                                                        </div>

                                                                        <p className="text-[10px] text-white/70">{segment.text}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    {allComplete && (
                        <div className="border-t border-[#1e3a5f] p-3 bg-[#0d1e30]">
                            <div className="flex items-center gap-2">
                                <Button
                                    className="flex-1 h-8 text-xs bg-[#6EACDA] text-[#021526] hover:bg-[#5a9bc4]"
                                    onClick={() => navigate("/dashboard/upload/ai-assessment", { state: { payloadId, results: videoResults } })}
                                >
                                    Continue to Assessment
                                </Button>
                                {/* <Button
                                    variant="outline"
                                    className="h-8 text-xs border-[#1e3a5f] text-[#6EACDA] hover:bg-[#1e3a5f] bg-transparent"
                                    onClick={() => {
                                        const blob = new Blob([JSON.stringify(videoResults, null, 2)], { type: "application/json" });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = `transcripts_${payloadId ?? "export"}.json`;
                                        a.click();
                                        URL.revokeObjectURL(url);
                                    }}
                                >
                                    <Download className="w-3 h-3 mr-1" /> Export All
                                </Button> */}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}