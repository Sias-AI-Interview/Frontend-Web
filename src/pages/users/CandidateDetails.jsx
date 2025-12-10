import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
    ArrowLeft,
    Mail,
    Calendar,
    Download,
    Play,
    CheckCircle2,
    XCircle,
    FileText,
    Video,
    MessageSquare,
    Award,
    BarChart3,
    ChevronDown,
    ChevronUp,
    ExternalLink,
} from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { useUploadStore } from "@/store/useUploadStore"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import axiosInstance from "@/libs/axios"

export default function CandidateDetailPage() {
    const { id } = useParams()
    const { fetchPayloadDetail, payloadDetail, payloadDetailLoading } = useUploadStore()

    const [expandedVideo, setExpandedVideo] = useState(null)

    useEffect(() => {
        if (id) {
            fetchPayloadDetail(id)
        }
    }, [id, fetchPayloadDetail])

    // backend res:
    // {
    //   id, created_at, file_url,
    //   payload: { data: {...}, success: true },
    //   ml_results: [...],
    //   assessment_results: [...]
    // }
    const data = payloadDetail?.payload?.data
    const assessmentResults = payloadDetail?.assessment_results || []
    const mlResults = payloadDetail?.ml_results || []

    const latestAssessment = assessmentResults[0]?.assessment_json?.data
    const latestAssessmentDetail = latestAssessment?.data

    const aiInterviewScores =
        latestAssessmentDetail?.reviewChecklistResult?.interviews?.scores || []
    const aiMaxScore =
        latestAssessmentDetail?.reviewChecklistResult?.interviews?.maxScore || 4
    const aiDecision = latestAssessmentDetail?.decision
    const aiNotes = latestAssessmentDetail?.notes
    const aiScoresOverview = latestAssessmentDetail?.scoresOverview

    if (payloadDetailLoading) {
        return (
            <DashboardLayout>
                <div className="p-10 text-center text-gray-400">Loading...</div>
            </DashboardLayout>
        )
    }

    if (!data) {
        return (
            <DashboardLayout>
                <div className="p-10 text-center text-gray-400">Data tidak ditemukan</div>
            </DashboardLayout>
        )
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "FINISHED":
                return "bg-green-500/20 text-green-400 border-green-500/30"
            case "IN_PROGRESS":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            case "PENDING":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    }

    const getDecisionBadge = (decision) => {
        switch (decision) {
            case "PASSED":
                return (
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                        Passed
                    </Badge>
                )
            case "FAILED":
                return (
                    <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">
                        Failed
                    </Badge>
                )
            default:
                return (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        Pending
                    </Badge>
                )
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return "-"
        const d = new Date(dateString)
        if (Number.isNaN(d.getTime())) return dateString
        return d.toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getScoreColor = (score, max) => {
        const percentage = (score / max) * 100
        if (percentage >= 75) return "text-green-400"
        if (percentage >= 50) return "text-yellow-400"
        return "text-red-400"
    }

    // helper format detik -> mm:ss
    const formatSeconds = (sec) => {
        if (typeof sec !== "number" || Number.isNaN(sec)) return "-"
        const total = Math.max(0, Math.floor(sec))
        const m = Math.floor(total / 60)
        const s = total % 60
        const mm = m.toString().padStart(2, "0")
        const ss = s.toString().padStart(2, "0")
        return `${mm}:${ss}`
    }

    // Helper: dapatkan ML result untuk question / position tertentu
    const getMlResultForQuestion = (questionId) => {
        return mlResults.find((r) => r.result?.question_id === questionId)?.result
    }

    // Helper: dapatkan AI score (dan reason) untuk question tertentu
    const getAiScoreForQuestion = (questionId) => {
        return aiInterviewScores.find((s) => s.id === questionId)
    }

    const handleDownloadJson = async () => {
        try {
            const response = await axiosInstance.get(
                `/payload/export/${id}?format=json`,
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], { type: "application/json" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `assessment_${id}.json`;
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("failed to download json", err);
        }
    };

    const handleDownloadPdf = async () => {
        try {
            const response = await axiosInstance.get(
                `/payload/export/${id}?format=pdf`,
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `assessment_${id}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("failed to download pdf", err);
        }
    };


    return (
        <DashboardLayout>
            <div className="space-y-6 p-8">
                {/* Back Button & Header */}
                <div className="flex items-center gap-4">
                    <Link to="/dashboard/assesment-result">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-white">Candidate Detail</h1>
                        <p className="text-sm text-gray-400">Review and assess candidate performance</p>
                    </div>
                </div>

                {/* Candidate Profile Card */}
                <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20 border-2 border-[#6EACDA]/30">
                                    <AvatarImage src={data.candidate.photoUrl || "/placeholder.svg"} />
                                    <AvatarFallback className="bg-[#6EACDA]/20 text-[#6EACDA] text-2xl">
                                        {data.candidate.name?.charAt(0) || "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{data.candidate.name}</h2>
                                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                                        <Mail className="h-4 w-4" />
                                        {data.candidate.email}
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Badge className="bg-[#6EACDA]/20 text-[#6EACDA] border border-[#6EACDA]/30">
                                            {data.certification.abbreviatedType}
                                        </Badge>
                                        <Badge className={getStatusColor(data.certification.status)}>
                                            {data.certification.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border-[#6EACDA]/30 text-[#6EACDA] hover:bg-[#6EACDA]/10 bg-transparent hover:text-slate-200 flex items-center gap-2"
                                        >
                                            <Download className="h-4 w-4" />
                                            Export Candidate Assessment
                                            <ChevronDownIcon className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="bg-[#021526] border-[#6EACDA]/30 text-white"
                                        align="end"
                                    >
                                        <DropdownMenuItem
                                            className="cursor-pointer hover:bg-[#0a2a3f]"
                                            onClick={handleDownloadJson}
                                        >
                                            Export as JSON
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="cursor-pointer hover:bg-[#0a2a3f]"
                                            onClick={handleDownloadPdf}
                                        >
                                            Export as PDF
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Score Overview Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                    <Award className="h-5 w-5 text-[#6EACDA]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Total Exam Score</p>
                                    <p className="text-2xl font-bold text-white">{data.certification.examScore}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                                    <FileText className="h-5 w-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Project Score</p>
                                    <p className="text-2xl font-bold text-white">
                                        {data.certification.autoGraderProjectScore}%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                                    <Video className="h-5 w-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Interview Questions</p>
                                    <p className="text-2xl font-bold text-white">
                                        {data.reviewChecklists.interviews.length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                                    <Calendar className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Submitted</p>
                                    <p className="text-sm font-medium text-white">
                                        {formatDate(data.certification.submittedAt)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Content */}
                <Tabs defaultValue="interviews" className="space-y-4">
                    <TabsList className="bg-[#0a2a3f] border border-[#6EACDA]/20">
                        <TabsTrigger
                            value="interviews"
                            className="data-[state=active]:bg-[#6EACDA]/20 data-[state=active]:text-[#6EACDA]"
                        >
                            <Video className="mr-2 h-4 w-4" />
                            Interview Videos
                        </TabsTrigger>
                        <TabsTrigger
                            value="ai_assessment"
                            className="data-[state=active]:bg-[#6EACDA]/20 data-[state=active]:text-[#6EACDA]"
                        >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            AI Assessment
                        </TabsTrigger>
                        <TabsTrigger
                            value="assess"
                            className="data-[state=active]:bg-[#6EACDA]/20 data-[state=active]:text-[#6EACDA]"
                        >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Assess
                        </TabsTrigger>
                    </TabsList>

                    {/* Interview Videos Tab */}
                    <TabsContent value="interviews" className="space-y-4">
                        {data.reviewChecklists.interviews.map((interview, index) => {
                            const ml = getMlResultForQuestion(interview.positionId)
                            const aiScore = getAiScoreForQuestion(interview.positionId)

                            const diarizationSegments = ml?.diarization_segments || []
                            const speakers = ml?.speakers || []
                            const sttSegments = ml?.stt_segments || []

                            return (
                                <Card
                                    key={interview.positionId}
                                    className="border-[#6EACDA]/20 bg-[#0a2a3f] overflow-hidden"
                                >
                                    <CardContent className="p-0">
                                        <button
                                            onClick={() =>
                                                setExpandedVideo(expandedVideo === index ? null : index)
                                            }
                                            className="w-full p-4 flex items-start justify-between text-left hover:bg-[#6EACDA]/5 transition-colors"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6EACDA]/20 text-sm font-medium text-[#6EACDA]">
                                                    {interview.positionId}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-medium pr-4">{interview.question}</p>
                                                    <div className="mt-2 flex items-center gap-2">
                                                        {interview.isVideoExist ? (
                                                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                                                <Play className="mr-1 h-3 w-3" />
                                                                Video Available
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                                                <XCircle className="mr-1 h-3 w-3" />
                                                                No Video
                                                            </Badge>
                                                        )}
                                                        {aiScore && (
                                                            <Badge className="bg-[#6EACDA]/10 text-[#6EACDA] border border-[#6EACDA]/40 text-xs">
                                                                AI Score: {aiScore.score}/{aiMaxScore}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {expandedVideo === index ? (
                                                <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                                            )}
                                        </button>

                                        {expandedVideo === index && (
                                            <div className="border-t border-[#6EACDA]/10 p-4 bg-[#021526]/50 space-y-4">
                                                {/* Video Open Button */}
                                                {interview.isVideoExist && (
                                                    <div className="aspect-video rounded-lg bg-black/50 flex items-center justify-center mb-4">
                                                        <div className="text-center">
                                                            <div className="h-16 w-16 mx-auto rounded-full bg-[#6EACDA]/20 flex items-center justify-center mb-3">
                                                                <Play className="h-8 w-8 text-[#6EACDA]" />
                                                            </div>
                                                            <p className="text-gray-400 text-sm mb-3">
                                                                Click to play interview video
                                                            </p>
                                                            <a
                                                                href={interview.recordedVideoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-[#6EACDA] hover:underline text-sm"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                                Open in Google Drive
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Transcript dari ML */}
                                                {ml && (
                                                    <div className="p-3 rounded-lg bg-[#0a2a3f] border border-[#6EACDA]/10">
                                                        <p className="text-xs text-gray-400 mb-2">AI Transcript</p>
                                                        <p className="text-sm text-white/80 whitespace-pre-wrap">
                                                            {ml.full_text}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Speakers */}
                                                {speakers.length > 0 && (
                                                    <div className="p-3 rounded-lg bg-[#0a2a3f] border border-[#6EACDA]/10">
                                                        <p className="text-xs text-gray-400 mb-2">Speakers</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {speakers.map((spk, idx) => (
                                                                <div
                                                                    key={spk.speaker ?? idx}
                                                                    className="px-3 py-2 rounded-md bg-[#021526] border border-[#6EACDA]/20"
                                                                >
                                                                    <p className="text-xs text-[#6EACDA] font-semibold">
                                                                        {spk.speaker}
                                                                    </p>
                                                                    <p className="text-xs text-gray-300">
                                                                        Total:{" "}
                                                                        {formatSeconds(
                                                                            spk.total_duration
                                                                        )}{" "}
                                                                        ({Math.round(
                                                                            spk.total_duration || 0
                                                                        )}s)
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Diarization Segments */}
                                                {diarizationSegments.length > 0 && (
                                                    <div className="p-3 rounded-lg bg-[#0a2a3f] border border-[#6EACDA]/10">
                                                        <p className="text-xs text-gray-400 mb-2">
                                                            Diarization Segments
                                                        </p>
                                                        <div className="max-h-48 overflow-auto space-y-1 pr-1">
                                                            {diarizationSegments.map((seg, idx) => (
                                                                <div
                                                                    key={`${seg.speaker}-${idx}`}
                                                                    className="flex items-center justify-between text-xs text-gray-300"
                                                                >
                                                                    <span className="w-20 text-[#6EACDA] font-medium">
                                                                        {seg.speaker}
                                                                    </span>
                                                                    <span className="flex-1">
                                                                        {formatSeconds(seg.start)} -{" "}
                                                                        {formatSeconds(seg.end)}
                                                                    </span>
                                                                    <span className="w-16 text-right text-gray-400">
                                                                        {Math.round(seg.duration)}s
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* STT Segments */}
                                                {sttSegments.length > 0 && (
                                                    <div className="p-3 rounded-lg bg-[#0a2a3f] border border-[#6EACDA]/10">
                                                        <p className="text-xs text-gray-400 mb-2">
                                                            STT Segments
                                                        </p>
                                                        <div className="max-h-64 overflow-auto space-y-2 pr-1">
                                                            {sttSegments.map((seg, idx) => (
                                                                <div
                                                                    key={seg.id ?? idx}
                                                                    className="rounded-md bg-[#021526] border border-[#6EACDA]/15 p-2 text-xs"
                                                                >
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-[#6EACDA] font-medium">
                                                                            #{idx + 1}
                                                                        </span>
                                                                        <span className="text-gray-400">
                                                                            {formatSeconds(seg.start)} -{" "}
                                                                            {formatSeconds(seg.end)}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-gray-200">
                                                                        {seg.text}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* AI Rated */}
                                                <div className="flex flex-col gap-2 p-3 rounded-lg bg-[#0a2a3f] border border-[#6EACDA]/10">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm text-gray-400">AI Rated</span>
                                                        {aiScore ? (
                                                            <Badge className="bg-[#6EACDA]/20 text-[#6EACDA] border border-[#6EACDA]/40 text-xs">
                                                                Score {aiScore.score}/{aiMaxScore}
                                                            </Badge>
                                                        ) : (
                                                            <span className="text-xs text-gray-500">
                                                                No AI score for this question
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Static 0–4 bar highlighting AI score */}
                                                    <div className="flex gap-1">
                                                        {[0, 1, 2, 3, 4].map((score) => (
                                                            <div
                                                                key={score}
                                                                className={`h-8 w-8 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${aiScore && aiScore.score === score
                                                                    ? "bg-[#6EACDA] text-white"
                                                                    : "bg-[#021526] text-gray-400"
                                                                    }`}
                                                            >
                                                                {score}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {aiScore?.reason && (
                                                        <p className="text-xs text-gray-300 mt-2">
                                                            {aiScore.reason}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </TabsContent>

                    {/* AI Assessment Tab */}
                    <TabsContent value="ai_assessment" className="space-y-4">
                        {assessmentResults.length > 0 ? (
                            assessmentResults.map((item, index) => {
                                const assessment = item.assessment_json?.data
                                const detail = assessment?.data
                                if (!assessment || !detail) return null

                                const aiScores = detail.reviewChecklistResult?.interviews
                                const aiList = aiScores?.scores || []
                                const maxScore = aiScores?.maxScore || 4

                                return (
                                    <Card key={item.id || index} className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage
                                                            src={
                                                                assessment.assessorProfile?.photoUrl ||
                                                                "/placeholder.svg"
                                                            }
                                                        />
                                                        <AvatarFallback className="bg-[#6EACDA]/20 text-[#6EACDA]">
                                                            {assessment.assessorProfile?.name?.charAt(0) || "A"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-white font-medium">
                                                            {assessment.assessorProfile?.name || "AI Assessor"}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {formatDate(item.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                                {getDecisionBadge(detail.decision)}
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            {/* Score Overview */}
                                            <div className="grid gap-3 md:grid-cols-3">
                                                <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                    <p className="text-xs text-gray-400 mb-1">Interview Score</p>
                                                    <p className="text-xl font-bold text-[#6EACDA]">
                                                        {detail.scoresOverview?.interview}
                                                    </p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                    <p className="text-xs text-gray-400 mb-1">Project Score</p>
                                                    <p className="text-xl font-bold text-green-400">
                                                        {detail.scoresOverview?.project}
                                                    </p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                    <p className="text-xs text-gray-400 mb-1">Total Score</p>
                                                    <p className="text-xl font-bold text-white">
                                                        {detail.scoresOverview?.total}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* AI Interview Scores */}
                                            {aiList.length > 0 && (
                                                <div>
                                                    <p className="text-sm font-medium text-white mb-3">
                                                        AI Interview Question Scores
                                                    </p>
                                                    <div className="space-y-2">
                                                        {aiList.map((s, idx) => {
                                                            const percentage = (s.score / maxScore) * 100
                                                            return (
                                                                <div key={s.id ?? idx} className="flex items-center gap-3">
                                                                    <span className="text-xs text-gray-400 w-24">
                                                                        Question {s.id}
                                                                    </span>
                                                                    <div className="flex-1">
                                                                        <Progress
                                                                            value={percentage}
                                                                            className="h-2 bg-black"
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className={`text-sm font-medium w-12 text-right ${getScoreColor(
                                                                            s.score,
                                                                            maxScore
                                                                        )}`}
                                                                    >
                                                                        {s.score}/{maxScore}
                                                                    </span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* AI Notes */}
                                            {detail.notes && (
                                                <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                    <p className="text-xs text-gray-400 mb-2">AI Notes</p>
                                                    <p className="text-sm text-white">{detail.notes}</p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )
                            })
                        ) : (
                            <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                <CardContent className="p-8 text-center">
                                    <MessageSquare className="h-12 w-12 mx-auto text-gray-500 mb-3" />
                                    <p className="text-gray-400">AI assessment has not been generated.</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Assess Tab - AI Summary */}
                    <TabsContent value="assess" className="space-y-4">
                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">AI Assessment Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Overall AI Scores */}
                                {aiScoresOverview && (
                                    <div>
                                        <p className="text-sm font-medium text-white mb-3">AI Score Overview</p>
                                        <div className="grid gap-3 md:grid-cols-3">
                                            <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                <p className="text-xs text-gray-400 mb-1">Interview Score</p>
                                                <p className="text-xl font-bold text-[#6EACDA]">
                                                    {aiScoresOverview.interview}
                                                </p>
                                            </div>
                                            <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                <p className="text-xs text-gray-400 mb-1">Project Score</p>
                                                <p className="text-xl font-bold text-green-400">
                                                    {aiScoresOverview.project}
                                                </p>
                                            </div>
                                            <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                <p className="text-xs text-gray-400 mb-1">Total Score</p>
                                                <p className="text-xl font-bold text-white">
                                                    {aiScoresOverview.total}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* AI Interview Scores per Question */}
                                <div>
                                    <p className="text-sm font-medium text-white mb-3">AI Interview Scores</p>
                                    <div className="grid gap-2 md:grid-cols-5">
                                        {data.reviewChecklists.interviews.map((interview) => {
                                            const aiScoreObj = aiInterviewScores.find(
                                                (s) => s.id === interview.positionId
                                            )
                                            const scoreValue = aiScoreObj?.score ?? null

                                            return (
                                                <div
                                                    key={interview.positionId}
                                                    className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10 text-center"
                                                >
                                                    <p className="text-xs text-gray-400 mb-1">
                                                        Q{interview.positionId}
                                                    </p>
                                                    <p
                                                        className={`text-lg font-bold ${scoreValue !== null
                                                            ? "text-[#6EACDA]"
                                                            : "text-gray-500"
                                                            }`}
                                                    >
                                                        {scoreValue !== null ? `${scoreValue}/${aiMaxScore}` : "-"}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* AI Decision */}
                                <div>
                                    <p className="text-sm font-medium text-white mb-3">AI Decision</p>
                                    <div className="flex items-center gap-3">
                                        {aiDecision ? (
                                            <>
                                                {getDecisionBadge(aiDecision)}
                                                <span className="text-sm text-gray-300">
                                                    AI suggests this candidate is{" "}
                                                    <span className="font-semibold">{aiDecision}</span>.
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-500">
                                                No AI decision found.
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* AI Notes */}
                                <div>
                                    <p className="text-sm font-medium text-white mb-3">AI Notes</p>
                                    <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                        <p className="text-sm text-white">
                                            {aiNotes || "AI did not provide additional notes."}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
