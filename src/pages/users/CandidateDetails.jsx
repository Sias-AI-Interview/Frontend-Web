
import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
    ArrowLeft,
    Mail,
    Calendar,
    Download,
    Play,
    CheckCircle2,
    XCircle,
    Clock,
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

// Mock data based on the JSON structure
const candidateData = {
    success: true,
    data: {
        id: 131,
        candidate: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            photoUrl: "/professional-man-portrait.png",
        },
        certification: {
            abbreviatedType: "DCML",
            normalType: "DEV_CERTIFICATION_MACHINE_LEARNING",
            submittedAt: "2025-08-02 07:49:52",
            status: "FINISHED",
            projectType: "dcml_package_1",
            interviewQuestionSets: 1,
            examScore: 94.33,
            autoGraderProjectScore: 100,
            downloadProjectUrl: "https://example.com/download",
            isReviewedByMe: false,
            isAlreadyReviewedByMe: false,
            assess: {
                project: false,
                interviews: true,
            },
        },
        reviewChecklists: {
            project: [],
            interviews: [
                {
                    positionId: 1,
                    question:
                        "Can you share any specific challenges you faced while working on certification and how you overcame them?",
                    isVideoExist: true,
                    recordedVideoUrl: "https://drive.google.com/file/d/1Ft6JnBuH3Id2DlGTznQpABivgtSg3uoe/view?usp=sharing",
                },
                {
                    positionId: 2,
                    question:
                        "Can you describe your experience with transfer learning in TensorFlow? How did it benefit your projects?",
                    isVideoExist: true,
                    recordedVideoUrl: "https://drive.google.com/file/d/1_UCAEXNa3ueoCL7WTi2sjYPHi09WXTKV/view?usp=sharing",
                },
                {
                    positionId: 3,
                    question:
                        "Describe a complex TensorFlow model you have built and the steps you took to ensure its accuracy and efficiency.",
                    isVideoExist: true,
                    recordedVideoUrl: "https://drive.google.com/file/d/1rktur9TPIdBRVTT9F_bVBvQ2IhD14yWI/view?usp=sharing",
                },
                {
                    positionId: 4,
                    question: "Explain how to implement dropout in a TensorFlow model and the effect it has on training.",
                    isVideoExist: true,
                    recordedVideoUrl: "https://drive.google.com/file/d/1co3oTuvGqbO6muKZ1v3dSdVd0uznge8B/view?usp=sharing",
                },
                {
                    positionId: 5,
                    question:
                        "Describe the process of building a convolutional neural network (CNN) using TensorFlow for image classification.",
                    isVideoExist: true,
                    recordedVideoUrl: "https://drive.google.com/file/d/1qbQl3q_YZbhMrPvb6hpf1APpxvLwgDKJ/view?usp=sharing",
                },
            ],
        },
        pastReviews: [
            {
                assessorProfile: {
                    id: 47,
                    name: "Sarah Johnson",
                    photoUrl: "/professional-woman.png",
                },
                decision: "PASSED",
                reviewedAt: "2025-08-06 21:19:05",
                scoresOverview: {
                    project: 100,
                    interview: 80,
                    total: 94.3,
                },
                reviewChecklistResult: {
                    project: [],
                    interviews: {
                        minScore: 0,
                        maxScore: 4,
                        scores: [
                            { id: 1, score: 3 },
                            { id: 2, score: 3 },
                            { id: 3, score: 4 },
                            { id: 4, score: 3 },
                            { id: 5, score: 3 },
                        ],
                    },
                },
                notes: "Great performance, not suspicious at all. Candidate demonstrated strong understanding of ML concepts.",
            },
        ],
    },
}

export default function CandidateDetailPage() {
    const { data } = candidateData
    const [expandedVideo, setExpandedVideo] = useState()
    const [interviewScores, setInterviewScores] = useState({})
    const [reviewNotes, setReviewNotes] = useState("")

    const getStatusColor = () => {
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
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Passed
                    </Badge>
                )
            case "FAILED":
                return (
                    <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 gap-1">
                        <XCircle className="h-3 w-3" />
                        Failed
                    </Badge>
                )
            default:
                return (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 gap-1">
                        <Clock className="h-3 w-3" />
                        Pending
                    </Badge>
                )
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
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

    return (
        <>
            <DashboardLayout>
                <div className="space-y-6 p-8">
                    {/* Back Button & Header */}
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard/candidates">
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
                                            {data.candidate.name.charAt(0)}
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
                                            <Badge className={getStatusColor(data.certification.status)}>{data.certification.status}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant="outline"
                                        className="border-[#6EACDA]/30 text-[#6EACDA] hover:bg-[#6EACDA]/10 bg-transparent"
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Project
                                    </Button>
                                    <Button className="bg-[#6EACDA] hover:bg-[#5a9bc9] text-white">
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Submit Review
                                    </Button>
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
                                        <p className="text-xs text-gray-400">Total Score</p>
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
                                        <p className="text-2xl font-bold text-white">{data.certification.autoGraderProjectScore}%</p>
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
                                        <p className="text-2xl font-bold text-white">{data.reviewChecklists.interviews.length}</p>
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
                                        <p className="text-sm font-medium text-white">{formatDate(data.certification.submittedAt)}</p>
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
                                value="reviews"
                                className="data-[state=active]:bg-[#6EACDA]/20 data-[state=active]:text-[#6EACDA]"
                            >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Past Reviews
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
                            {data.reviewChecklists.interviews.map((interview, index) => (
                                <Card key={interview.positionId} className="border-[#6EACDA]/20 bg-[#0a2a3f] overflow-hidden">
                                    <CardContent className="p-0">
                                        <button
                                            onClick={() => setExpandedVideo(expandedVideo === index ? null : index)}
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
                                                    </div>
                                                </div>
                                            </div>
                                            {expandedVideo === index ? (
                                                <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                                            )}
                                        </button>

                                        {expandedVideo === index && interview.isVideoExist && (
                                            <div className="border-t border-[#6EACDA]/10 p-4 bg-[#021526]/50">
                                                <div className="aspect-video rounded-lg bg-black/50 flex items-center justify-center mb-4">
                                                    <div className="text-center">
                                                        <div className="h-16 w-16 mx-auto rounded-full bg-[#6EACDA]/20 flex items-center justify-center mb-3">
                                                            <Play className="h-8 w-8 text-[#6EACDA]" />
                                                        </div>
                                                        <p className="text-gray-400 text-sm mb-3">Click to play interview video</p>
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

                                                {/* Scoring for this question */}
                                                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a2a3f] border border-[#6EACDA]/10">
                                                    <span className="text-sm text-gray-400">Rate this answer (0-4):</span>
                                                    <div className="flex gap-1">
                                                        {[0, 1, 2, 3, 4].map((score) => (
                                                            <button
                                                                key={score}
                                                                onClick={() => setInterviewScores((prev) => ({ ...prev, [interview.positionId]: score }))}
                                                                className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${interviewScores[interview.positionId] === score
                                                                    ? "bg-[#6EACDA] text-white"
                                                                    : "bg-[#021526] text-gray-400 hover:bg-[#6EACDA]/20 hover:text-[#6EACDA]"
                                                                    }`}
                                                            >
                                                                {score}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        {/* Past Reviews Tab */}
                        <TabsContent value="reviews" className="space-y-4">
                            {data.pastReviews.length > 0 ? (
                                data.pastReviews.map((review, index) => (
                                    <Card key={index} className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={review.assessorProfile.photoUrl || "/placeholder.svg"} />
                                                        <AvatarFallback className="bg-[#6EACDA]/20 text-[#6EACDA]">
                                                            {review.assessorProfile.name.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-white">{review.assessorProfile.name}</p>
                                                        <p className="text-xs text-gray-400">{formatDate(review.reviewedAt)}</p>
                                                    </div>
                                                </div>
                                                {getDecisionBadge(review.decision)}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {/* Score Overview */}
                                            <div className="grid gap-3 md:grid-cols-3">
                                                <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                    <p className="text-xs text-gray-400 mb-1">Project Score</p>
                                                    <p className="text-xl font-bold text-green-400">{review.scoresOverview.project}%</p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                    <p className="text-xs text-gray-400 mb-1">Interview Score</p>
                                                    <p className="text-xl font-bold text-[#6EACDA]">{review.scoresOverview.interview}%</p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                    <p className="text-xs text-gray-400 mb-1">Total Score</p>
                                                    <p className="text-xl font-bold text-white">{review.scoresOverview.total}%</p>
                                                </div>
                                            </div>

                                            {/* Interview Scores */}
                                            <div>
                                                <p className="text-sm font-medium text-white mb-3">Interview Question Scores</p>
                                                <div className="space-y-2">
                                                    {review.reviewChecklistResult.interviews.scores.map((scoreItem, idx) => {
                                                        const maxScore = review.reviewChecklistResult.interviews.maxScore
                                                        const percentage = (scoreItem.score / maxScore) * 100
                                                        return (
                                                            <div key={scoreItem.id} className="flex items-center gap-3">
                                                                <span className="text-xs text-gray-400 w-24">Question {scoreItem.id}</span>
                                                                <div className="flex-1">
                                                                    <Progress value={percentage} className="h-2 bg-[#021526]" />
                                                                </div>
                                                                <span
                                                                    className={`text-sm font-medium w-12 text-right ${getScoreColor(scoreItem.score, maxScore)}`}
                                                                >
                                                                    {scoreItem.score}/{maxScore}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            {review.notes && (
                                                <div className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10">
                                                    <p className="text-xs text-gray-400 mb-2">Reviewer Notes</p>
                                                    <p className="text-sm text-white">{review.notes}</p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                    <CardContent className="p-8 text-center">
                                        <MessageSquare className="h-12 w-12 mx-auto text-gray-500 mb-3" />
                                        <p className="text-gray-400">No reviews yet for this candidate.</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Assess Tab */}
                        <TabsContent value="assess" className="space-y-4">
                            <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">Submit Your Assessment</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Quick Score Summary */}
                                    <div>
                                        <p className="text-sm font-medium text-white mb-3">Your Interview Scores</p>
                                        <div className="grid gap-2 md:grid-cols-5">
                                            {data.reviewChecklists.interviews.map((interview) => (
                                                <div
                                                    key={interview.positionId}
                                                    className="p-3 rounded-lg bg-[#021526] border border-[#6EACDA]/10 text-center"
                                                >
                                                    <p className="text-xs text-gray-400 mb-1">Q{interview.positionId}</p>
                                                    <p
                                                        className={`text-lg font-bold ${interviewScores[interview.positionId] !== undefined ? "text-[#6EACDA]" : "text-gray-500"
                                                            }`}
                                                    >
                                                        {interviewScores[interview.positionId] !== undefined
                                                            ? `${interviewScores[interview.positionId]}/4`
                                                            : "-"}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Decision */}
                                    <div>
                                        <p className="text-sm font-medium text-white mb-3">Your Decision</p>
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 bg-transparent"
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                Pass
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 bg-transparent"
                                            >
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Fail
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <p className="text-sm font-medium text-white mb-3">Review Notes</p>
                                        <Textarea
                                            placeholder="Add your notes about this candidate's performance..."
                                            value={reviewNotes}
                                            onChange={(e) => setReviewNotes(e.target.value)}
                                            className="min-h-[120px] border-[#6EACDA]/20 bg-[#021526] text-white placeholder:text-gray-500"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            variant="outline"
                                            className="border-[#6EACDA]/30 text-gray-400 hover:bg-[#6EACDA]/10 bg-transparent"
                                        >
                                            Save Draft
                                        </Button>
                                        <Button className="bg-[#6EACDA] hover:bg-[#5a9bc9] text-white">Submit Review</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </DashboardLayout>
        </>
    )
}
