"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    Loader2,
    Clock,
    Download,
    Mic,
    Users,
    FileText,
    Play,
    Copy,
    Check,
    ChevronDown,
    ChevronRight,
    Terminal,
    Sparkles,
    Wifi,
    Zap,
    Brain,
    AudioWaveform,
    Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


const videoQueue = [
    {
        name: "Interview_Session_1.mp4",
        driveUrl: "https://drive.google.com/file/d/1abc123/view",
    },
    {
        name: "Interview_Session_2.mp4",
        driveUrl: "https://drive.google.com/file/d/2def456/view",
    },
    {
        name: "Interview_Session_3.mp4",
        driveUrl: "https://drive.google.com/file/d/3ghi789/view",
    },
]

const stageConfig = {
    queue: { icon: Clock, label: "Queue", description: "Menunggu antrian..." },
    download: { icon: Download, label: "Download", description: "Mengunduh file video..." },
    whisper: { icon: Mic, label: "Transcription", description: "Memproses audio dengan Whisper AI..." },
    diarization: { icon: Users, label: "Diarization", description: "Mengidentifikasi pembicara..." },
    done: { icon: FileText, label: "Complete", description: "Analisis selesai!" },
}

const stageOrder = ["queue", "download", "whisper", "diarization", "done"]

const transcriptSamples = [
    {
        text: "Can you share any specific challenges you faced while working on certification and how you overcome them? Ah, okay. Actually, for the challenges, there are some challenges when I took the certifications, especially for the project submission that I was already working with.",
        segments: [
            {
                id: 0,
                start: 0.0,
                end: 7.0,
                text: "Can you share any specific challenges you faced while working on certification and how you overcome them?",
                speaker: "Interviewer",
            },
            {
                id: 1,
                start: 7.0,
                end: 28.0,
                text: "Ah, okay. Actually, for the challenges, there are some challenges when I took the certifications, especially for the project submission that I was already working with.",
                speaker: "Candidate",
            },
        ],
    },
    {
        text: "Tell me about your experience with machine learning frameworks? I have extensive experience with TensorFlow and PyTorch. I've worked on several deep learning projects including image classification and NLP tasks.",
        segments: [
            {
                id: 0,
                start: 0.0,
                end: 5.0,
                text: "Tell me about your experience with machine learning frameworks?",
                speaker: "Interviewer",
            },
            {
                id: 1,
                start: 5.0,
                end: 20.0,
                text: "I have extensive experience with TensorFlow and PyTorch. I've worked on several deep learning projects including image classification and NLP tasks.",
                speaker: "Candidate",
            },
        ],
    },
    {
        text: "How do you handle tight deadlines? I prioritize tasks based on impact and urgency. I also communicate proactively with stakeholders if there are any blockers or risks to the timeline.",
        segments: [
            { id: 0, start: 0.0, end: 4.0, text: "How do you handle tight deadlines?", speaker: "Interviewer" },
            {
                id: 1,
                start: 4.0,
                end: 18.0,
                text: "I prioritize tasks based on impact and urgency. I also communicate proactively with stakeholders if there are any blockers or risks to the timeline.",
                speaker: "Candidate",
            },
        ],
    },
]

function QueueLoader({ position }) {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-[#6EACDA]/20 animate-pulse" />
                <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-[#6EACDA] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <span className="text-2xl font-bold text-[#6EACDA]">{position}</span>
                        <p className="text-[9px] text-[#6EACDA]/60">in queue</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#6EACDA]"
                        style={{
                            animation: "pulse 1.5s ease-in-out infinite",
                            animationDelay: `${i * 0.2}s`,
                            opacity: i < position ? 1 : 0.2,
                        }}
                    />
                ))}
            </div>
            <p className="text-xs text-[#6EACDA]/60 mt-3">Menunggu giliran proses...</p>
        </div>
    )
}

function DownloadLoader() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return prev
                return prev + Math.random() * 15
            })
        }, 300)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        <Download className="w-8 h-8 text-[#6EACDA] animate-bounce" />
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-[#6EACDA]"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    animation: `downloadParticle 1.5s ease-out infinite`,
                                    animationDelay: `${i * 0.25}s`,
                                    transform: `rotate(${i * 60}deg) translateY(-16px)`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-40 mt-4">
                <div className="flex justify-between text-[10px] text-[#6EACDA]/60 mb-1">
                    <span>Downloading...</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#6EACDA] to-[#4a9bc9] rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <p className="text-xs text-[#6EACDA]/60 mt-3">Mengunduh dari Google Drive...</p>
        </div>
    )
}

function WhisperLoader() {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-28 h-20">
                <div className="flex items-center justify-center gap-0.5 h-full">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-[#6EACDA] to-[#6EACDA]/40 rounded-full"
                            style={{
                                animation: "waveform 1s ease-in-out infinite",
                                animationDelay: `${i * 0.1}s`,
                                height: "16px",
                            }}
                        />
                    ))}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-[#0d1e30] border-2 border-[#6EACDA] flex items-center justify-center">
                        <Brain className="w-4 h-4 text-[#6EACDA]" />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                <span className="text-xs text-[#6EACDA]">Whisper AI Processing</span>
            </div>
            <p className="text-[10px] text-[#6EACDA]/60 mt-1">Mengkonversi audio menjadi teks...</p>
            <div className="flex gap-1 mt-3">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#6EACDA]"
                        style={{
                            animation: "bounce 1s ease-in-out infinite",
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

function DiarizationLoader() {
    const [activeSpeaker, setActiveSpeaker] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSpeaker((prev) => (prev + 1) % 3)
        }, 800)
        return () => clearInterval(interval)
    }, [])

    const speakers = [
        { label: "S1", color: "#6EACDA" },
        { label: "S2", color: "#4ade80" },
        { label: "S3", color: "#f472b6" },
    ]

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-28 h-28">
                {speakers.map((speaker, i) => {
                    const angle = (i * 120 - 90) * (Math.PI / 180)
                    const x = 50 + 35 * Math.cos(angle)
                    const y = 50 + 35 * Math.sin(angle)
                    const isActive = i === activeSpeaker

                    return (
                        <div
                            key={i}
                            className="absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: "translate(-50%, -50%)",
                                backgroundColor: `${speaker.color}${isActive ? "40" : "20"}`,
                                border: `2px solid ${speaker.color}`,
                                boxShadow: isActive ? `0 0 16px ${speaker.color}60` : "none",
                                scale: isActive ? "1.15" : "1",
                            }}
                        >
                            <Users className="w-3 h-3" style={{ color: speaker.color }} />
                        </div>
                    )
                })}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#1e3a5f] border border-[#6EACDA]/30 flex items-center justify-center">
                        <AudioWaveform className="w-3 h-3 text-[#6EACDA]" />
                    </div>
                </div>
                <div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#6EACDA]/30"
                    style={{ animation: "spin 8s linear infinite" }}
                />
            </div>
            <div className="mt-4 text-center">
                <p className="text-xs text-[#6EACDA]">Identifying Speakers</p>
                <p className="text-[10px] text-[#6EACDA]/60 mt-1">Memisahkan suara pembicara...</p>
            </div>
        </div>
    )
}

function SuccessLoader() {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-green-400"
                        style={{
                            top: "50%",
                            left: "50%",
                            animation: `successParticle 1s ease-out forwards`,
                            animationDelay: `${i * 0.1}s`,
                            transform: `rotate(${i * 45}deg)`,
                        }}
                    />
                ))}
            </div>
            <p className="text-sm font-medium text-green-400 mt-3">Analisis Selesai!</p>
        </div>
    )
}

export default function AnalyzingPage() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [videoResults, setVideoResults] = useState(
        videoQueue.map((video, index) => ({
            videoIndex: index,
            videoName: video.name,
            driveUrl: video.driveUrl,
            text: "",
            segments: [],
            status: index === 0 ? "processing" : "pending",
            currentStage: index === 0 ? "queue" : undefined,
        })),
    )
    const [logs, setLogs] = useState([])
    const [copied, setCopied] = useState(null)
    const [expandedVideos, setExpandedVideos] = useState([])
    const [showTerminal, setShowTerminal] = useState(false)
    const [queuePosition, setQueuePosition] = useState(1)
    const [allComplete, setAllComplete] = useState(false)

    const currentVideo = videoResults[currentVideoIndex]
    const overallProgress = (videoResults.filter((v) => v.status === "done").length / videoResults.length) * 100

    useEffect(() => {
        const processVideo = async (videoIndex) => {
            const stages = [
                {
                    stage: "queue",
                    code: 102,
                    message: `Kamu berada di antrian ke-${videoIndex + 1}. Tunggu sampai giliranmu diproses.`,
                    delay: 1500,
                    data: { queue_position: videoIndex + 1 },
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
                    delay: 3000,
                },
                {
                    stage: "done",
                    code: 200,
                    message: `Transcribe + diarization berhasil [${videoQueue[videoIndex].name}]`,
                    delay: 1000,
                },
            ]

            for (const stageData of stages) {
                await new Promise((resolve) => setTimeout(resolve, stageData.delay))

                setVideoResults((prev) => prev.map((v, i) => (i === videoIndex ? { ...v, currentStage: stageData.stage } : v)))

                setLogs((prev) => [
                    ...prev,
                    {
                        stage: stageData.stage,
                        message: stageData.message,
                        timestamp: new Date(),
                        code: stageData.code,
                        data: stageData.data,
                        videoIndex,
                    },
                ])

                if (stageData.data?.queue_position) {
                    setQueuePosition(stageData.data.queue_position)
                }

                if (stageData.stage === "done") {
                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    setVideoResults((prev) =>
                        prev.map((v, i) =>
                            i === videoIndex
                                ? {
                                    ...v,
                                    status: "done",
                                    text: transcriptSamples[videoIndex % transcriptSamples.length].text,
                                    segments: transcriptSamples[videoIndex % transcriptSamples.length].segments,
                                }
                                : v,
                        ),
                    )
                    setExpandedVideos((prev) => [...prev, videoIndex])
                }
            }

            // Start next video if available
            const nextIndex = videoIndex + 1
            if (nextIndex < videoQueue.length) {
                setCurrentVideoIndex(nextIndex)
                setVideoResults((prev) =>
                    prev.map((v, i) => (i === nextIndex ? { ...v, status: "processing", currentStage: "queue" } : v)),
                )
                processVideo(nextIndex)
            } else {
                setAllComplete(true)
            }
        }

        processVideo(0)
    }, [])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const copyTranscript = (videoIndex, text) => {
        navigator.clipboard.writeText(text)
        setCopied(videoIndex)
        setTimeout(() => setCopied(null), 2000)
    }

    const toggleVideoExpand = (videoIndex) => {
        setExpandedVideos((prev) =>
            prev.includes(videoIndex) ? prev.filter((i) => i !== videoIndex) : [...prev, videoIndex],
        )
    }

    const getStageStatus = (video, stage) => {
        if (video.status === "pending") return "pending"
        if (video.status === "done") return "completed"

        const currentIndex = stageOrder.indexOf(video.currentStage || "queue")
        const stageIndex = stageOrder.indexOf(stage)

        if (stageIndex < currentIndex) return "completed"
        if (stageIndex === currentIndex) return "active"
        return "pending"
    }

    const renderStageLoader = (video) => {
        if (video.status !== "processing") return null

        switch (video.currentStage) {
            case "queue":
                return <QueueLoader position={queuePosition} />
            case "download":
                return <DownloadLoader />
            case "whisper":
                return <WhisperLoader />
            case "diarization":
                return <DiarizationLoader />
            case "done":
                return <SuccessLoader />
            default:
                return null
        }
    }

    return (
        <div className="min-h-[calc(100vh-48px)] bg-[#0a1628]">
            <style jsx>{`
        @keyframes waveform {
          0%, 100% { height: 6px; }
          50% { height: 28px; }
        }
        @keyframes downloadParticle {
          0% { opacity: 1; transform: rotate(var(--rotation)) translateY(0); }
          100% { opacity: 0; transform: rotate(var(--rotation)) translateY(24px); }
        }
        @keyframes successParticle {
          0% { opacity: 1; transform: rotate(var(--rotation)) translateY(0); }
          100% { opacity: 0; transform: rotate(var(--rotation)) translateY(-32px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
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
                        <Badge
                            variant="outline"
                            className={`text-[10px] ${allComplete ? "border-green-400/30 text-green-400" : "border-[#6EACDA]/30 text-[#6EACDA]"}`}
                        >
                            {allComplete ? "All Complete" : `Processing ${currentVideoIndex + 1}/${videoQueue.length}`}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#6EACDA]/60">Overall:</span>
                            <div className="w-24 h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#6EACDA] to-green-400 rounded-full transition-all duration-500"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                            <span className="text-[10px] text-[#6EACDA]">{Math.round(overallProgress)}%</span>
                        </div>
                        <Wifi className="w-3 h-3 text-green-400" />
                    </div>
                </div>
            </div>

            {/* Main Content - Split View */}
            <div className="flex h-[calc(100vh-48px-41px)]">
                {/* Left Panel - Video Queue & Process */}
                <div className="w-1/2 border-r border-[#1e3a5f] flex flex-col">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 px-3 py-1.5 border-b border-[#1e3a5f] bg-[#0d1e30]">
                        <button
                            onClick={() => setShowTerminal(false)}
                            className={`px-2.5 py-1 text-[10px] rounded flex items-center gap-1 transition-colors ${!showTerminal ? "bg-[#6EACDA]/20 text-[#6EACDA]" : "text-[#6EACDA]/60 hover:text-[#6EACDA]"
                                }`}
                        >
                            <Sparkles className="w-3 h-3" />
                            Flow
                        </button>
                        <button
                            onClick={() => setShowTerminal(true)}
                            className={`px-2.5 py-1 text-[10px] rounded flex items-center gap-1 transition-colors ${showTerminal ? "bg-[#6EACDA]/20 text-[#6EACDA]" : "text-[#6EACDA]/60 hover:text-[#6EACDA]"
                                }`}
                        >
                            <Terminal className="w-3 h-3" />
                            Terminal
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-3">
                        {!showTerminal ? (
                            <div className="space-y-3">
                                {/* Video Queue List */}
                                {videoResults.map((video, index) => (
                                    <Card
                                        key={index}
                                        className={`bg-[#0d1e30] border-[#1e3a5f] overflow-hidden transition-all ${index === currentVideoIndex && video.status === "processing" ? "ring-1 ring-[#6EACDA]/50" : ""
                                            }`}
                                    >
                                        {/* Video Header */}
                                        <div
                                            className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-[#1e3a5f]/30"
                                            onClick={() => video.status === "done" && toggleVideoExpand(index)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-7 h-7 rounded flex items-center justify-center ${video.status === "done"
                                                        ? "bg-green-500/20"
                                                        : video.status === "processing"
                                                            ? "bg-[#6EACDA]/20"
                                                            : "bg-[#1e3a5f]"
                                                        }`}
                                                >
                                                    {video.status === "done" ? (
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                                    ) : video.status === "processing" ? (
                                                        <Loader2 className="w-3.5 h-3.5 text-[#6EACDA] animate-spin" />
                                                    ) : (
                                                        <Video className="w-3.5 h-3.5 text-[#6EACDA]/40" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-white">{video.videoName}</p>
                                                    <p className="text-[10px] text-[#6EACDA]/60 truncate max-w-[180px]">{video.driveUrl}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className={`text-[9px] ${video.status === "done"
                                                        ? "border-green-400/30 text-green-400"
                                                        : video.status === "processing"
                                                            ? "border-[#6EACDA]/30 text-[#6EACDA]"
                                                            : "border-[#1e3a5f] text-[#6EACDA]/40"
                                                        }`}
                                                >
                                                    {video.status === "done"
                                                        ? "Complete"
                                                        : video.status === "processing"
                                                            ? video.currentStage
                                                            : "Pending"}
                                                </Badge>
                                                {video.status === "done" &&
                                                    (expandedVideos.includes(index) ? (
                                                        <ChevronDown className="w-3.5 h-3.5 text-[#6EACDA]/60" />
                                                    ) : (
                                                        <ChevronRight className="w-3.5 h-3.5 text-[#6EACDA]/60" />
                                                    ))}
                                            </div>
                                        </div>

                                        {/* Processing Stages */}
                                        {video.status === "processing" && (
                                            <div className="border-t border-[#1e3a5f] p-3">
                                                {/* Stage Progress */}
                                                <div className="flex items-center justify-between mb-3">
                                                    {stageOrder.slice(0, -1).map((stage, stageIndex) => {
                                                        const status = getStageStatus(video, stage)
                                                        const StageIcon = stageConfig[stage].icon

                                                        return (
                                                            <div key={stage} className="flex items-center">
                                                                <div
                                                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${status === "completed"
                                                                        ? "bg-green-500/20 text-green-400"
                                                                        : status === "active"
                                                                            ? "bg-[#6EACDA]/20 text-[#6EACDA] ring-2 ring-[#6EACDA]/30"
                                                                            : "bg-[#1e3a5f] text-[#6EACDA]/40"
                                                                        }`}
                                                                >
                                                                    {status === "completed" ? (
                                                                        <Check className="w-3 h-3" />
                                                                    ) : status === "active" ? (
                                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                                    ) : (
                                                                        <StageIcon className="w-3 h-3" />
                                                                    )}
                                                                </div>
                                                                {stageIndex < stageOrder.length - 2 && (
                                                                    <div
                                                                        className={`w-8 h-0.5 mx-1 ${status === "completed" ? "bg-green-400/50" : "bg-[#1e3a5f]"
                                                                            }`}
                                                                    />
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                                {/* Stage Labels */}
                                                <div className="flex justify-between text-[9px] text-[#6EACDA]/60 mb-3 px-1">
                                                    {stageOrder.slice(0, -1).map((stage) => (
                                                        <span key={stage} className="text-center w-12">
                                                            {stageConfig[stage].label}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Interactive Loader */}
                                                <div className="bg-[#0a1628] rounded-lg border border-[#1e3a5f]">
                                                    {renderStageLoader(video)}
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            /* Terminal View */
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
                                            <span className="text-[#6EACDA]/40">{log.timestamp.toLocaleTimeString()}</span>
                                            <span className="text-green-400">RECV:</span>
                                            <span className="text-[#6EACDA]">
                                                {`{'code': ${log.code}, 'message': '${log.message}', 'stage': '${log.stage}'${log.data ? `, 'data': ${JSON.stringify(log.data)}` : ", 'data': None"
                                                    }}`}
                                            </span>
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
                            {videoResults.filter((v) => v.status === "done").length}/{videoResults.length} completed
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3">
                        {videoResults.filter((v) => v.status === "done").length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 rounded-full bg-[#1e3a5f]/50 flex items-center justify-center mb-3">
                                    <FileText className="w-5 h-5 text-[#6EACDA]/40" />
                                </div>
                                <p className="text-sm text-[#6EACDA]/60">Waiting for transcripts...</p>
                                <p className="text-[10px] text-[#6EACDA]/40 mt-1">
                                    Results will appear here when processing is complete
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {videoResults
                                    .filter((v) => v.status === "done")
                                    .map((video) => (
                                        <Card key={video.videoIndex} className="bg-[#0d1e30] border-[#1e3a5f]">
                                            {/* Video Result Header */}
                                            <div
                                                className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-[#1e3a5f]/30"
                                                onClick={() => toggleVideoExpand(video.videoIndex)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                                                    </div>
                                                    <span className="text-xs font-medium text-white">{video.videoName}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 px-2 text-[10px] text-[#6EACDA] hover:bg-[#1e3a5f]"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            copyTranscript(video.videoIndex, video.text)
                                                        }}
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

                                            {/* Expanded Content */}
                                            {expandedVideos.includes(video.videoIndex) && (
                                                <div className="border-t border-[#1e3a5f] p-2.5 space-y-2.5">
                                                    {/* Full Transcript */}
                                                    <div className="bg-[#0a1628] rounded p-2.5">
                                                        <p className="text-[10px] font-medium text-[#6EACDA]/60 mb-1.5">Full Transcript</p>
                                                        <p className="text-xs text-white/80 leading-relaxed">{video.text}</p>
                                                    </div>

                                                    {/* Segments */}
                                                    <div>
                                                        <p className="text-[10px] font-medium text-[#6EACDA]/60 mb-1.5">
                                                            Segments ({video.segments.length})
                                                        </p>
                                                        <div className="space-y-1.5">
                                                            {video.segments.map((segment) => (
                                                                <div
                                                                    key={segment.id}
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
                                                                                {segment.speaker}
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
                                <Button className="flex-1 h-8 text-xs bg-[#6EACDA] text-[#021526] hover:bg-[#5a9bc4]">
                                    Continue to Assessment
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 text-xs border-[#1e3a5f] text-[#6EACDA] hover:bg-[#1e3a5f] bg-transparent"
                                >
                                    <Download className="w-3 h-3 mr-1" />
                                    Export All
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
