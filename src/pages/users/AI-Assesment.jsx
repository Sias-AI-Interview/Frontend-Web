"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Play,
    Pause,
    ChevronDown,
    ChevronRight,
    CheckCircle2,
    Send,
    Sparkles,
    Download,
    Brain,
    Loader2,
    Star,
    Clock,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import axiosInstance from "@/libs/axios"
import { toast } from "sonner"
import { useRef } from "react"

function AnalyzingLoader() {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Brain className="w-5 h-5 text-[#6EACDA] animate-pulse" />
                <div className="absolute -inset-1 rounded-full border border-[#6EACDA]/30 animate-ping" />
            </div>
            <span className="text-xs text-[#6EACDA]">AI Analyzing...</span>
        </div>
    )
}

export default function AssessmentPage() {
    const location = useLocation()
    const payloadId = location.state?.payloadId || null
    const payloadData = location.state?.payloadData || null

    const [assessments, setAssessments] = useState([])
    const [expandedVideos, setExpandedVideos] = useState([])
    const [playingVideo, setPlayingVideo] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [currentProcessingIndex, setCurrentProcessingIndex] = useState(null)

    // SUMMARY STATES (sesuai JSON baru)
    const [userAssessorProfile, setUserAssessorProfile] = useState(null)
    const [mlAssessorProfile, setMlAssessorProfile] = useState(null)
    const [decision, setDecision] = useState(null)
    const [decisionNotes, setDecisionNotes] = useState("")
    const [scoresOverview, setScoresOverview] = useState(null)
    const [reviewedAt, setReviewedAt] = useState(null)
    const [queuePosition, setQueuePosition] = useState(null)
    const [perQuestionMaxScore, setPerQuestionMaxScore] = useState(4)
    const [mlCode, setMlCode] = useState(null)
    const [mlMessage, setMlMessage] = useState("")
    const [rawMlResult, setRawMlResult] = useState(null)
    const calledRef = useRef(false)


    useEffect(() => {
        if (payloadData?.data?.reviewChecklistResult?.interviews?.scores) {
            const queueAssessments =
                payloadData.data.reviewChecklistResult.interviews.scores.map((item, idx) => ({
                    videoIndex: idx,
                    videoName: `Interview_Q${idx + 1}`,
                    question: `Question ${idx + 1}`,
                    transcript: item.reason || "",
                    segments: [
                        {
                            id: 0,
                            start: 0,
                            end: 0,
                            text: item.reason || "",
                            speaker: "Candidate",
                        },
                    ],
                    aiScore: null,
                    aiReason: null,
                    aiStrengths: [],
                    aiWeaknesses: [],
                    aiSuggestions: [],
                    status: "queue",
                    queuePosition: idx + 1,
                }))
            setAssessments(queueAssessments)
        }
    }, [payloadData])

    useEffect(() => {
        if (calledRef.current) return
        calledRef.current = true
        fetchAssessments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const fetchAssessments = async () => {
        if (!payloadId) {
            toast.error("Payload ID tidak ditemukan");
            return;
        }

        setIsProcessing(true);

        try {
            const res = await axiosInstance.post("assessment/get", {
                payload_id: payloadId,
            });

            /** =======================
             *  NORMALISASI JSON BARU
             *  ======================= */
            const mlRoot = res.data?.ml_results?.data || {};
            const mlInner = mlRoot?.data || {};

            setRawMlResult(mlRoot);

            // OUTER ASSESSOR
            setUserAssessorProfile(mlRoot.assessorProfile || null);

            // ML Status
            setMlCode(mlRoot.code ?? null);
            setMlMessage(mlRoot.message ?? "");

            // INNER ML DATA
            setMlAssessorProfile(mlInner.assessorProfile || null);
            setDecision(mlInner.decision || null);
            setDecisionNotes(mlInner.notes || "");
            setReviewedAt(mlInner.reviewedAt || null);
            setQueuePosition(mlInner.queue_position ?? null);
            setScoresOverview(mlInner.scoresOverview || null);

            const interviewBlock = mlInner.reviewChecklistResult?.interviews || {};
            const maxScore = interviewBlock.maxScore ?? 4;
            const scoreList = interviewBlock.scores ?? [];

            setPerQuestionMaxScore(maxScore);

            /** =======================
             *   NORMALISASI SCORES
             *  ======================= */
            const mapped = scoreList.map((item, idx) => ({
                videoIndex: idx,
                videoName: `Interview_Q${idx + 1}`,
                question: `Question ${idx + 1}`,
                transcript: item.reason || "",
                segments: [
                    {
                        id: 0,
                        start: 0,
                        end: 0,
                        text: item.reason || "",
                        speaker: "Candidate",
                    },
                ],
                aiScore: item.score ?? null,
                aiReason: item.reason || "",
                aiStrengths: item.strengths || [],
                aiWeaknesses: item.weaknesses || [],
                aiSuggestions: item.suggestions || [],
                status: "done",
            }));

            setAssessments(mapped);
        }

        catch (err) {
            console.error("ML ERROR:", err);

            toast.error(
                err?.response?.data?.ml_raw ||
                err?.response?.data?.error ||
                "Gagal memproses Assessment"
            );

            setRawMlResult(err?.response?.data || {});
        }

        finally {
            setIsProcessing(false);
        }
    };


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const toggleVideoExpand = (index) => {
        setExpandedVideos((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        )
    }

    const completedAssessments = assessments.filter((a) => a.status === "done").length
    const totalScore = assessments.reduce((sum, a) => sum + (a.aiScore || 0), 0)
    const maxScore = assessments.length * perQuestionMaxScore
    const averageScore =
        completedAssessments > 0
            ? (totalScore / completedAssessments).toFixed(1)
            : "-"

    const getScoreColor = (score) => {
        if (score >= 4) return "text-green-400 bg-green-400/10 border-green-400/30"
        if (score >= 3) return "text-[#6EACDA] bg-[#6EACDA]/10 border-[#6EACDA]/30"
        if (score >= 2) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
        return "text-red-400 bg-red-400/10 border-red-400/30"
    }

    const getScoreLabel = (score) => {
        if (score >= 4) return "Excellent"
        if (score >= 3) return "Good"
        if (score >= 2) return "Fair"
        if (score >= 1) return "Poor"
        return "Very Poor"
    }

    const getRecommendation = () => {
        if (completedAssessments === 0) return null
        const avg = totalScore / completedAssessments
        if (avg >= 3.5)
            return {
                label: "Highly Recommended",
                color: "text-green-400 bg-green-400/10 border-green-400/30",
            }
        if (avg >= 2.5)
            return {
                label: "Recommended",
                color: "text-[#6EACDA] bg-[#6EACDA]/10 border-[#6EACDA]/30",
            }
        if (avg >= 1.5)
            return {
                label: "Consider",
                color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
            }
        return {
            label: "Not Recommended",
            color: "text-red-400 bg-red-400/10 border-red-400/30",
        }
    }

    const recommendation = getRecommendation()

    const handleExport = () => {
        if (assessments.length === 0) return

        const exportData = assessments.map((a) => ({
            videoName: a.videoName,
            question: a.question,
            transcript: a.segments.map((s) => s.text).join(" "),
            aiScore: a.aiScore,
            aiReason: a.aiReason,
            strengths: a.aiStrengths,
            weaknesses: a.aiWeaknesses,
            suggestions: a.aiSuggestions,
        }))

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: "application/json",
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `assessment_report_${payloadId || Date.now()}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const getDecisionBadgeClasses = (value) => {
        if (!value) return "bg-[#1e3a5f] text-[#6EACDA] border-[#1e3a5f]"
        const upper = String(value).toUpperCase()
        if (upper === "PASSED")
            return "bg-green-500/15 text-green-400 border-green-500/30"
        if (upper === "FAILED")
            return "bg-red-500/15 text-red-400 border-red-500/30"
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
    }

    return (
        <div className="min-h-screen bg-[#021526]">
            {/* HEADER */}
            <div className="sticky top-0 z-10 bg-[#021526]/95 backdrop-blur border-b border-[#1e3a5f]">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/dashboard/upload">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#6EACDA] hover:bg-[#1e3a5f]"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back
                            </Button>
                        </Link>
                        <div className="h-5 w-px bg-[#1e3a5f]" />
                        <div>
                            <h1 className="text-sm font-semibold text-white flex items-center gap-2">
                                <Brain className="w-4 h-4 text-[#6EACDA]" />
                                AI Interview Assessment
                            </h1>
                            <p className="text-xs text-[#6EACDA]/60">
                                {isProcessing
                                    ? `Processing ${currentProcessingIndex !== null
                                        ? currentProcessingIndex + 1
                                        : 0
                                    } of ${assessments.length} videos...`
                                    : "All videos analyzed"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Stats */}
                        <div className="flex items-center gap-4 px-3 py-1.5 bg-[#0d1e30] rounded-lg border border-[#1e3a5f]">
                            <div className="text-center">
                                <p className="text-lg font-bold text-white">
                                    {completedAssessments}/{assessments.length}
                                </p>
                                <p className="text-[10px] text-[#6EACDA]/60">Analyzed</p>
                            </div>
                            <div className="h-8 w-px bg-[#1e3a5f]" />
                            <div className="text-center">
                                <p className="text-lg font-bold text-[#6EACDA]">
                                    {averageScore}
                                </p>
                                <p className="text-[10px] text-[#6EACDA]/60">
                                    Avg Score / Question
                                </p>
                            </div>
                            <div className="h-8 w-px bg-[#1e3a5f]" />
                            <div className="text-center">
                                <p className="text-lg font-bold text-white">
                                    {totalScore}/{maxScore}
                                </p>
                                <p className="text-[10px] text-[#6EACDA]/60">Total</p>
                            </div>
                            {recommendation && (
                                <>
                                    <div className="h-8 w-px bg-[#1e3a5f]" />
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${recommendation.color}`}
                                    >
                                        {recommendation.label}
                                    </Badge>
                                </>
                            )}
                        </div>

                        {isProcessing && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#6EACDA]/10 rounded-lg border border-[#6EACDA]/30">
                                <Loader2 className="w-4 h-4 text-[#6EACDA] animate-spin" />
                                <span className="text-xs text-[#6EACDA]">AI Processing...</span>
                            </div>
                        )}

                        <Link to={`/dashboard/assesment-result/${payloadId}`}>
                            <Button
                                size="sm"
                                className="bg-[#6EACDA] text-[#021526] hover:bg-[#5a9bc9]"
                                disabled={completedAssessments < assessments.length}
                            >
                                <Send className="w-3.5 h-3.5 mr-1.5" />
                                Done Exit
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="max-w-7xl mx-auto px-4 mt-3">
                <div className="h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#6EACDA] to-[#4a9cd4] transition-all duration-500"
                        style={{
                            width: `${assessments.length > 0
                                ? (completedAssessments / assessments.length) * 100
                                : 0
                                }%`,
                        }}
                    />
                </div>
            </div>

            {/* SUMMARY CARD (tampilkan semua dari JSON: assessorProfile, code, message, data.*) */}
            <div className="max-w-7xl mx-auto px-4 mt-4 space-y-4">
                {(userAssessorProfile ||
                    mlAssessorProfile ||
                    decision ||
                    scoresOverview ||
                    mlCode !== null ||
                    mlMessage) && (
                        <Card className="bg-[#0d1e30] border-[#1e3a5f] p-4">
                            <div className="flex flex-col gap-4">
                                {/* USER ASSESSOR (outer assessorProfile) */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        {userAssessorProfile?.photoUrl ? (
                                            <img
                                                src={userAssessorProfile.photoUrl}
                                                alt={userAssessorProfile.name}
                                                className="w-10 h-10 rounded-full border border-[#1e3a5f] object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm text-white">
                                                {(userAssessorProfile?.name || "A")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                {userAssessorProfile?.name || "Assessor"}
                                            </p>
                                            <p className="text-[11px] text-[#6EACDA]/60">
                                                ID: {userAssessorProfile?.id || "-"}
                                            </p>
                                            {reviewedAt && (
                                                <p className="text-[11px] text-[#6EACDA]/40">
                                                    Reviewed at: {reviewedAt}
                                                </p>
                                            )}
                                            {queuePosition !== null && (
                                                <p className="text-[11px] text-[#6EACDA]/40">
                                                    Queue position: {queuePosition}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-2">
                                        {decision && (
                                            <Badge
                                                variant="outline"
                                                className={`text-xs border px-3 py-1 ${getDecisionBadgeClasses(
                                                    decision
                                                )}`}
                                            >
                                                Decision: {decision}
                                            </Badge>
                                        )}
                                        {decisionNotes && (
                                            <p className="text-xs text-[#6EACDA]/80 max-w-md text-right">
                                                {decisionNotes}
                                            </p>
                                        )}
                                        {mlCode !== null && (
                                            <p className="text-[11px] text-[#6EACDA]/60">
                                                Code: {mlCode}
                                            </p>
                                        )}
                                        {mlMessage && (
                                            <p className="text-[11px] text-[#6EACDA]/60 text-right">
                                                Message: {mlMessage}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* ML ASSESSOR (inner data.assessorProfile) */}
                                {mlAssessorProfile && (
                                    <div className="flex items-center gap-3 border-t border-[#1e3a5f] pt-3">
                                        {mlAssessorProfile.photoUrl ? (
                                            <img
                                                src={mlAssessorProfile.photoUrl}
                                                alt={mlAssessorProfile.name}
                                                className="w-8 h-8 rounded-full border border-[#1e3a5f] object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-xs text-white">
                                                {(mlAssessorProfile.name || "D")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-[11px] font-semibold text-[#6EACDA]">
                                                ML Assessor
                                            </p>
                                            <p className="text-xs text-white">
                                                {mlAssessorProfile.name}
                                            </p>
                                            <p className="text-[11px] text-[#6EACDA]/60">
                                                ID: {mlAssessorProfile.id}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* SCORES OVERVIEW */}
                                {scoresOverview && (
                                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="bg-[#021526] border border-[#1e3a5f] rounded-lg p-3">
                                            <p className="text-[11px] text-[#6EACDA]/60 mb-1">
                                                Interview Score
                                            </p>
                                            <p className="text-lg font-semibold text-white">
                                                {scoresOverview.interview ?? 0}%
                                            </p>
                                        </div>
                                        <div className="bg-[#021526] border border-[#1e3a5f] rounded-lg p-3">
                                            <p className="text-[11px] text-[#6EACDA]/60 mb-1">
                                                Project Score
                                            </p>
                                            <p className="text-lg font-semibold text-white">
                                                {scoresOverview.project ?? 0}%
                                            </p>
                                        </div>
                                        <div className="bg-[#021526] border border-[#1e3a5f] rounded-lg p-3">
                                            <p className="text-[11px] text-[#6EACDA]/60 mb-1">
                                                Total Score
                                            </p>
                                            <p className="text-lg font-semibold text-[#6EACDA]">
                                                {scoresOverview.total ?? 0}%
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}

                {/* RAW JSON VIEW – nampilin SEMUA JSON yang kamu minta */}
                {rawMlResult && (
                    <Card className="bg-[#0d1e30] border-[#1e3a5f] p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[#6EACDA]" />
                            <h4 className="text-xs font-semibold text-[#6EACDA]">
                                Raw Assessment JSON
                            </h4>
                        </div>
                        <pre className="text-[10px] text-[#e5e7eb] bg-black/30 rounded-md p-3 overflow-x-auto max-h-64">
                            {JSON.stringify(rawMlResult, null, 2)}
                        </pre>
                    </Card>
                )}
            </div>

            {/* ASSESSMENTS LIST */}
            {isProcessing ? (
                <div className="flex items-center justify-center py-10">
                    <AnalyzingLoader />
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
                    {assessments.map((assessment, index) => (
                        <Card
                            key={assessment.videoIndex}
                            className={`bg-[#0d1e30] border-[#1e3a5f] overflow-hidden transition-all ${expandedVideos.includes(index)
                                ? "ring-1 ring-[#6EACDA]/30"
                                : ""
                                } ${assessment.status === "analyzing"
                                    ? "ring-1 ring-[#6EACDA]/50"
                                    : ""
                                }`}
                        >
                            {/* Video Header */}
                            <div
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#1e3a5f]/20 transition-colors"
                                onClick={() => toggleVideoExpand(index)}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${assessment.status === "done"
                                            ? "bg-green-500/20"
                                            : assessment.status === "analyzing"
                                                ? "bg-[#6EACDA]/20"
                                                : "bg-[#1e3a5f]"
                                            }`}
                                    >
                                        {assessment.status === "analyzing" ? (
                                            <Brain className="w-4 h-4 text-[#6EACDA] animate-pulse" />
                                        ) : assessment.status === "done" ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-[#6EACDA]/50" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            {assessment.videoName}
                                        </p>
                                        <p className="text-xs text-[#6EACDA]/60 line-clamp-1">
                                            {assessment.question}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {assessment.status === "queue" &&
                                        assessment.queuePosition && <AnalyzingLoader />}
                                    {assessment.status === "analyzing" && <AnalyzingLoader />}
                                    {assessment.aiScore !== null && (
                                        <Badge
                                            variant="outline"
                                            className={`text-xs ${getScoreColor(
                                                assessment.aiScore
                                            )}`}
                                        >
                                            <Star className="w-3 h-3 mr-1 fill-current" />
                                            {assessment.aiScore}/{perQuestionMaxScore} -{" "}
                                            {getScoreLabel(assessment.aiScore)}
                                        </Badge>
                                    )}
                                    {expandedVideos.includes(index) ? (
                                        <ChevronDown className="w-4 h-4 text-[#6EACDA]/60" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-[#6EACDA]/60" />
                                    )}
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {expandedVideos.includes(index) && (
                                <div className="border-t border-[#1e3a5f] p-4 space-y-4">
                                    {/* Transcript */}
                                    <div>
                                        <h4 className="text-xs font-medium text-[#6EACDA]/80 mb-2 flex items-center gap-1.5">
                                            <Sparkles className="w-3 h-3" />
                                            Transcript Segments
                                        </h4>
                                        <div className="space-y-2">
                                            {assessment.segments.map((segment) => (
                                                <div
                                                    key={segment.id}
                                                    className={`flex gap-3 p-2 rounded-lg ${segment.speaker === "Interviewer"
                                                        ? "bg-[#1e3a5f]/30"
                                                        : "bg-[#6EACDA]/5"
                                                        }`}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            setPlayingVideo(
                                                                playingVideo === segment.id
                                                                    ? null
                                                                    : segment.id
                                                            )
                                                        }
                                                        className="flex-shrink-0 w-7 h-7 rounded-full bg-[#6EACDA]/20 flex items-center justify-center hover:bg-[#6EACDA]/30 transition-colors"
                                                    >
                                                        {playingVideo === segment.id ? (
                                                            <Pause className="w-3 h-3 text-[#6EACDA]" />
                                                        ) : (
                                                            <Play className="w-3 h-3 text-[#6EACDA] ml-0.5" />
                                                        )}
                                                    </button>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span
                                                                className={`text-[10px] font-medium ${segment.speaker ===
                                                                    "Interviewer"
                                                                    ? "text-[#6EACDA]"
                                                                    : "text-green-400"
                                                                    }`}
                                                            >
                                                                {segment.speaker}
                                                            </span>
                                                            <span className="text-[10px] text-[#6EACDA]/40">
                                                                {formatTime(segment.start)} -{" "}
                                                                {formatTime(segment.end)}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-white/80 leading-relaxed">
                                                            {segment.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* AI Analysis Result */}
                                    {assessment.status === "done" &&
                                        assessment.aiScore !== null && (
                                            <div
                                                className={`p-4 rounded-lg border ${getScoreColor(
                                                    assessment.aiScore
                                                )}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${assessment.aiScore >= 4
                                                            ? "bg-green-400/20"
                                                            : assessment.aiScore >= 3
                                                                ? "bg-[#6EACDA]/20"
                                                                : assessment.aiScore >= 2
                                                                    ? "bg-yellow-400/20"
                                                                    : "bg-red-400/20"
                                                            }`}
                                                    >
                                                        <Star
                                                            className={`w-5 h-5 ${assessment.aiScore >= 4
                                                                ? "text-green-400"
                                                                : assessment.aiScore >= 3
                                                                    ? "text-[#6EACDA]"
                                                                    : assessment.aiScore >= 2
                                                                        ? "text-yellow-400"
                                                                        : "text-red-400"
                                                                } fill-current`}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-lg font-bold text-white">
                                                                {assessment.aiScore}/
                                                                {perQuestionMaxScore}
                                                            </span>
                                                            <Badge
                                                                variant="outline"
                                                                className={getScoreColor(
                                                                    assessment.aiScore
                                                                )}
                                                            >
                                                                {getScoreLabel(assessment.aiScore)}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                                                            {assessment.aiReason}
                                                        </p>

                                                        <div className="grid grid-cols-3 gap-3">
                                                            {/* Strengths */}
                                                            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-3">
                                                                <h5 className="text-xs font-medium text-green-400 mb-2">
                                                                    Strengths
                                                                </h5>
                                                                <ul className="list-disc ml-4 text-[10px] text-white/80 space-y-1">
                                                                    {assessment.aiStrengths &&
                                                                        assessment.aiStrengths.length >
                                                                        0 ? (
                                                                        assessment.aiStrengths.map(
                                                                            (s, i) => (
                                                                                <li key={i}>{s}</li>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <li>-</li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                            {/* Weaknesses */}
                                                            <div className="bg-red-400/5 border border-red-400/20 rounded-lg p-3">
                                                                <h5 className="text-xs font-medium text-red-400 mb-2">
                                                                    Weaknesses
                                                                </h5>
                                                                <ul className="list-disc ml-4 text-[10px] text-white/80 space-y-1">
                                                                    {assessment.aiWeaknesses &&
                                                                        assessment.aiWeaknesses.length >
                                                                        0 ? (
                                                                        assessment.aiWeaknesses.map(
                                                                            (w, i) => (
                                                                                <li key={i}>{w}</li>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <li>-</li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                            {/* Suggestions */}
                                                            <div className="bg-[#6EACDA]/5 border border-[#6EACDA]/20 rounded-lg p-3">
                                                                <h5 className="text-xs font-medium text-[#6EACDA] mb-2">
                                                                    Suggestions
                                                                </h5>
                                                                <ul className="list-disc ml-4 text-[10px] text-white/80 space-y-1">
                                                                    {assessment.aiSuggestions &&
                                                                        assessment.aiSuggestions.length >
                                                                        0 ? (
                                                                        assessment.aiSuggestions.map(
                                                                            (s, i) => (
                                                                                <li key={i}>{s}</li>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <li>-</li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            )}
                        </Card>
                    ))}

                    {/* EXPORT BUTTON */}
                    {assessments.length > 0 && (
                        <Card className="mt-4 bg-[#0d1e30] border-[#1e3a5f] p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EACDA]/20 to-[#6EACDA]/5 flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-[#6EACDA]" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">
                                            Assessment Complete
                                        </h3>
                                        <p className="text-xs text-[#6EACDA]/60">
                                            Total Score: {totalScore}/{maxScore} | Average:{" "}
                                            {averageScore}/{perQuestionMaxScore}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {recommendation && (
                                        <Badge
                                            variant="outline"
                                            className={`${recommendation.color} px-3 py-1`}
                                        >
                                            {recommendation.label}
                                        </Badge>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-[#6EACDA]/30 text-[#6EACDA] hover:bg-[#6EACDA]/10 bg-transparent"
                                        onClick={handleExport}
                                    >
                                        <Download className="w-3.5 h-3.5 mr-1.5" />
                                        Export Report
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            )}
        </div>
    )
}
