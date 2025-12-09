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
import { Link } from "react-router-dom"
import axiosInstance from "@/libs/axios"
import { toast } from "sonner"
import { useLocation } from "react-router-dom"



// const initialAssessments = [
//     {
//         videoIndex: 0,
//         videoName: "Interview_Q1_Challenges.mp4",
//         question:
//             "Can you share any specific challenges you faced while working on certification and how you overcome them?",
//         transcript:
//             "Ah, okay. Actually, for the challenges, there are some challenges when I took the certifications, especially for the project submission that I was already working with. The main challenge was time management because I had to balance my work responsibilities with studying for the certification. I overcame this by creating a strict schedule and dedicating specific hours each day to preparation.",
//         segments: [
//             {
//                 id: 0,
//                 start: 0.0,
//                 end: 7.0,
//                 text: "Can you share any specific challenges you faced while working on certification and how you overcome them?",
//                 speaker: "Interviewer",
//             },
//             {
//                 id: 1,
//                 start: 7.0,
//                 end: 28.0,
//                 text: "Ah, okay. Actually, for the challenges, there are some challenges when I took the certifications, especially for the project submission that I was already working with.",
//                 speaker: "Candidate",
//             },
//             {
//                 id: 2,
//                 start: 28.0,
//                 end: 45.0,
//                 text: "The main challenge was time management because I had to balance my work responsibilities with studying for the certification.",
//                 speaker: "Candidate",
//             },
//             {
//                 id: 3,
//                 start: 45.0,
//                 end: 58.0,
//                 text: "I overcame this by creating a strict schedule and dedicating specific hours each day to preparation.",
//                 speaker: "Candidate",
//             },
//         ],
//         aiScore: null,
//         aiReason: null,
//         aiStrengths: [],
//         aiWeaknesses: [],
//         aiSuggestions: [],
//         status: "queue",
//         queuePosition: 1,
//     },
//     {
//         videoIndex: 1,
//         videoName: "Interview_Q2_ML_Experience.mp4",
//         question: "Tell me about your experience with machine learning frameworks?",
//         transcript:
//             "I have extensive experience with TensorFlow and PyTorch. I've worked on several deep learning projects including image classification and NLP tasks. In my previous role, I developed a sentiment analysis model that improved customer feedback processing by 40%. I also have experience with scikit-learn for traditional ML algorithms and have deployed models using Docker and Kubernetes.",
//         segments: [
//             {
//                 id: 0,
//                 start: 0.0,
//                 end: 5.0,
//                 text: "Tell me about your experience with machine learning frameworks?",
//                 speaker: "Interviewer",
//             },
//             {
//                 id: 1,
//                 start: 5.0,
//                 end: 20.0,
//                 text: "I have extensive experience with TensorFlow and PyTorch. I've worked on several deep learning projects including image classification and NLP tasks.",
//                 speaker: "Candidate",
//             },
//             {
//                 id: 2,
//                 start: 20.0,
//                 end: 35.0,
//                 text: "In my previous role, I developed a sentiment analysis model that improved customer feedback processing by 40%.",
//                 speaker: "Candidate",
//             },
//             {
//                 id: 3,
//                 start: 35.0,
//                 end: 48.0,
//                 text: "I also have experience with scikit-learn for traditional ML algorithms and have deployed models using Docker and Kubernetes.",
//                 speaker: "Candidate",
//             },
//         ],
//         aiScore: null,
//         aiReason: null,
//         aiStrengths: [],
//         aiWeaknesses: [],
//         aiSuggestions: [],
//         status: "queue",
//         queuePosition: 2,
//     },
//     {
//         videoIndex: 2,
//         videoName: "Interview_Q3_Deadlines.mp4",
//         question: "How do you handle tight deadlines?",
//         transcript:
//             "I prioritize tasks based on impact and urgency. I also communicate proactively with stakeholders if there are any blockers or risks to the timeline. I use project management tools like Jira to track progress and ensure nothing falls through the cracks. When facing tight deadlines, I break down large tasks into smaller manageable chunks and focus on delivering MVP first.",
//         segments: [
//             { id: 0, start: 0.0, end: 4.0, text: "How do you handle tight deadlines?", speaker: "Interviewer" },
//             {
//                 id: 1,
//                 start: 4.0,
//                 end: 18.0,
//                 text: "I prioritize tasks based on impact and urgency. I also communicate proactively with stakeholders if there are any blockers or risks to the timeline.",
//                 speaker: "Candidate",
//             },
//             {
//                 id: 2,
//                 start: 18.0,
//                 end: 30.0,
//                 text: "I use project management tools like Jira to track progress and ensure nothing falls through the cracks.",
//                 speaker: "Candidate",
//             },
//             {
//                 id: 3,
//                 start: 30.0,
//                 end: 42.0,
//                 text: "When facing tight deadlines, I break down large tasks into smaller manageable chunks and focus on delivering MVP first.",
//                 speaker: "Candidate",
//             },
//         ],
//         aiScore: null,
//         aiReason: null,
//         aiStrengths: [],
//         aiWeaknesses: [],
//         aiSuggestions: [],
//         status: "queue",
//         queuePosition: 3,
//     },
//     {
//         videoIndex: 3,
//         videoName: "Interview_Q4_Teamwork.mp4",
//         question: "Describe a situation where you had to work with a difficult team member.",
//         transcript:
//             "In my previous project, I worked with a team member who had different working styles. They preferred working alone and rarely communicated progress. I initiated regular sync meetings and created a shared document for updates. By establishing clear communication channels and understanding their perspective, we improved collaboration and successfully delivered the project on time.",
//         segments: [
//             {
//                 id: 0,
//                 start: 0.0,
//                 end: 5.0,
//                 text: "Describe a situation where you had to work with a difficult team member.",
//                 speaker: "Interviewer",
//             },
//             {
//                 id: 1,
//                 start: 5.0,
//                 end: 18.0,
//                 text: "In my previous project, I worked with a team member who had different working styles. They preferred working alone and rarely communicated progress.",
//                 speaker: "Candidate",
//             },
//             {
//                 id: 2,
//                 start: 18.0,
//                 end: 32.0,
//                 text: "I initiated regular sync meetings and created a shared document for updates.",
//                 speaker: "Candidate",
//             },
//             {
//                 id: 3,
//                 start: 32.0,
//                 end: 45.0,
//                 text: "By establishing clear communication channels and understanding their perspective, we improved collaboration and successfully delivered the project on time.",
//                 speaker: "Candidate",
//             },
//         ],
//         aiScore: null,
//         aiReason: null,
//         aiStrengths: [],
//         aiWeaknesses: [],
//         aiSuggestions: [],
//         status: "queue",
//         queuePosition: 4,
//     },
// ]

// // AI response simulation
// const aiResponses = [
//     {
//         score: 3,
//         reason:
//             "Kandidat menunjukkan pemahaman yang baik tentang tantangan yang dihadapi selama proses sertifikasi. Jawaban terstruktur dengan jelas, dimulai dari identifikasi masalah (time management) hingga solusi konkret (strict schedule). Kandidat mendemonstrasikan self-awareness dan kemampuan problem-solving yang solid.",
//         strengths: [
//             "Mampu mengidentifikasi tantangan spesifik dengan jelas",
//             "Memberikan solusi konkret dan actionable",
//             "Menunjukkan kemampuan time management",
//             "Jawaban terstruktur dengan baik (problem → solution)",
//         ],
//         weaknesses: [
//             "Kurang menyebutkan hasil spesifik dari strategi yang diterapkan",
//             "Tidak memberikan contoh timeline atau durasi studi",
//             "Bisa lebih detail tentang tools yang digunakan",
//         ],
//         suggestions: [
//             "Tambahkan metrik keberhasilan (misal: lulus dalam X bulan)",
//             "Sebutkan tools spesifik untuk scheduling",
//             "Berikan contoh bagaimana menyeimbangkan work dan study secara konkret",
//         ],
//     },
//     {
//         score: 4,
//         reason:
//             "Jawaban sangat komprehensif dan menunjukkan keahlian teknis yang mendalam. Kandidat menyebutkan framework spesifik (TensorFlow, PyTorch, scikit-learn), proyek konkret (image classification, NLP, sentiment analysis), dan hasil terukur (40% improvement). Pengetahuan deployment (Docker, Kubernetes) menambah nilai signifikan.",
//         strengths: [
//             "Menyebutkan multiple frameworks dengan expertise level",
//             "Memberikan contoh proyek konkret dan beragam",
//             "Hasil terukur (40% improvement) sangat impressive",
//             "Menunjukkan end-to-end capability hingga deployment",
//             "Technical depth yang excellent",
//         ],
//         weaknesses: ["Tidak menyebutkan ukuran tim atau kolaborasi", "Kurang detail tentang challenges yang dihadapi"],
//         suggestions: ["Tambahkan konteks tentang skala proyek", "Sebutkan bagaimana berkolaborasi dengan tim"],
//     },
//     {
//         score: 3,
//         reason:
//             "Kandidat memberikan pendekatan sistematis dan terstruktur dalam menangani deadline ketat. Strategi prioritization, komunikasi proaktif, dan penggunaan tools (Jira) menunjukkan profesionalisme. Pendekatan MVP-first mendemonstrasikan pragmatisme dan understanding of agile principles.",
//         strengths: [
//             "Pendekatan sistematis dengan prioritization framework",
//             "Komunikasi proaktif dengan stakeholders",
//             "Penggunaan project management tools",
//             "MVP-first mindset menunjukkan pragmatisme",
//             "Task breakdown strategy yang efektif",
//         ],
//         weaknesses: [
//             "Tidak memberikan contoh situasi nyata/spesifik",
//             "Kurang menyebutkan bagaimana handle stress",
//             "Tidak ada metrik keberhasilan",
//         ],
//         suggestions: [
//             "Berikan contoh kasus nyata dengan timeline spesifik",
//             "Sebutkan bagaimana mengelola stress dalam deadline ketat",
//             "Tambahkan contoh hasil yang dicapai dengan pendekatan ini",
//         ],
//     },
//     {
//         score: 4,
//         reason:
//             "Kandidat mendemonstrasikan emotional intelligence dan conflict resolution skills yang excellent. Pendekatan proaktif (inisiatif sync meetings, shared document) menunjukkan leadership. Kemampuan memahami perspektif orang lain dan fokus pada hasil (delivered on time) sangat positif.",
//         strengths: [
//             "Emotional intelligence yang tinggi",
//             "Proaktif dalam mencari solusi",
//             "Leadership initiative dalam team dynamics",
//             "Focus pada hasil dan delivery",
//             "Empati terhadap perspektif berbeda",
//         ],
//         weaknesses: ["Tidak detail tentang specific challenges yang dihadapi", "Kurang menjelaskan lessons learned"],
//         suggestions: [
//             "Tambahkan detail tentang friction points spesifik",
//             "Sebutkan apa yang dipelajari dari pengalaman tersebut",
//         ],
//     },
// ]

function QueueLoader({ position }) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
                <div className="absolute inset-0 rounded-full border-2 border-[#1e3a5f]" />
                <div className="absolute inset-0 rounded-full border-2 border-[#6EACDA]/30 border-t-[#6EACDA] animate-spin" />
            </div>
            <span className="text-xs text-[#6EACDA]/60">Queue #{position}</span>
        </div>
    )
}

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
    const location = useLocation();
    const payloadId = location.state?.payloadId || null;

    const [assessments, setAssessments] = useState([])
    const [expandedVideos, setExpandedVideos] = useState([])
    const [playingVideo, setPlayingVideo] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [currentProcessingIndex, setCurrentProcessingIndex] = useState(null)

    useEffect(() => {
        fetchAssessments()
    }, [])

    const fetchAssessments = async () => {
        setIsProcessing(true)
        try {
            const res = await axiosInstance.get("assessment/get", { params: { payloadId: payloadId } })
            const data = res.data.ml_results?.data

            if (!data) {
                toast.error("No ML results found")
                return
            }

            const reviewScores = data.reviewChecklistResult.interviews.scores || []
            const mappedAssessments = reviewScores.map((item, idx) => ({
                videoIndex: idx,
                videoName: `Interview_Q${idx + 1}`,
                question: `Question ${idx + 1}`,
                transcript: item.reason || "",
                segments: [{ id: 0, start: 0, end: 0, text: item.reason || "", speaker: "Candidate" }],
                aiScore: item.score,
                aiReason: item.reason,
                aiStrengths: [],
                aiWeaknesses: [],
                aiSuggestions: [],
                status: "done",
                queuePosition: null,
            }))

            setAssessments(mappedAssessments)
        } catch (err) {
            console.error("Failed to fetch assessments:", err)
        } finally {
            setIsProcessing(false)
        }
    }

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

    // const handleSubmit = async () => {
    //     setIsSubmitting(true)
    //     try {
    //         await axios.post("/api/assessment/submit", { assessments })
    //         alert("Assessment submitted!")
    //     } catch (err) {
    //         console.error(err)
    //         alert("Failed to submit assessment")
    //     } finally {
    //         setIsSubmitting(false)
    //     }
    // }

    const completedAssessments = assessments.filter((a) => a.status === "done").length
    const totalScore = assessments.reduce((sum, a) => sum + (a.aiScore || 0), 0)
    const maxScore = assessments.length * 4
    const averageScore = completedAssessments > 0 ? (totalScore / completedAssessments).toFixed(1) : "-"

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
        if (avg >= 3.5) return { label: "Highly Recommended", color: "text-green-400 bg-green-400/10 border-green-400/30" }
        if (avg >= 2.5) return { label: "Recommended", color: "text-[#6EACDA] bg-[#6EACDA]/10 border-[#6EACDA]/30" }
        if (avg >= 1.5) return { label: "Consider", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" }
        return { label: "Not Recommended", color: "text-red-400 bg-red-400/10 border-red-400/30" }
    }

    const recommendation = getRecommendation()

    return (
        <div className="min-h-screen bg-[#021526]">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#021526]/95 backdrop-blur border-b border-[#1e3a5f]">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard/upload/analyzing">
                                <Button variant="ghost" size="sm" className="text-[#6EACDA] hover:bg-[#1e3a5f]">
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
                                        ? `Processing ${currentProcessingIndex !== null ? currentProcessingIndex + 1 : 0} of ${assessments.length} videos...`
                                        : "All videos analyzed"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Progress Stats */}
                            <div className="flex items-center gap-4 px-3 py-1.5 bg-[#0d1e30] rounded-lg border border-[#1e3a5f]">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-white">
                                        {completedAssessments}/{assessments.length}
                                    </p>
                                    <p className="text-[10px] text-[#6EACDA]/60">Analyzed</p>
                                </div>
                                <div className="h-8 w-px bg-[#1e3a5f]" />
                                <div className="text-center">
                                    <p className="text-lg font-bold text-[#6EACDA]">{averageScore}</p>
                                    <p className="text-[10px] text-[#6EACDA]/60">Avg Score</p>
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
                                        <Badge variant="outline" className={`text-xs ${recommendation.color}`}>
                                            {recommendation.label}
                                        </Badge>
                                    </>
                                )}
                            </div>

                            {/* Processing indicator */}
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
                                    disabled={completedAssessments < assessments.length || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                                            Done Exiting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5 mr-1.5" />
                                            Done Exit
                                        </>
                                    )}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Overall Progress Bar */}
                    <div className="mt-3">
                        <div className="h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#6EACDA] to-[#4a9cd4] transition-all duration-500"
                                style={{ width: `${(completedAssessments / assessments.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="space-y-3">
                    {assessments.map((assessment, index) => (
                        <Card
                            key={assessment.videoIndex}
                            className={`bg-[#0d1e30] border-[#1e3a5f] overflow-hidden transition-all ${expandedVideos.includes(index) ? "ring-1 ring-[#6EACDA]/30" : ""
                                } ${assessment.status === "analyzing" ? "ring-1 ring-[#6EACDA]/50" : ""}`}
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
                                        <p className="text-sm font-medium text-white">{assessment.videoName}</p>
                                        <p className="text-xs text-[#6EACDA]/60 line-clamp-1">{assessment.question}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Status indicators */}
                                    {assessment.status === "queue" && assessment.queuePosition && (
                                        <QueueLoader position={assessment.queuePosition} />
                                    )}

                                    {assessment.status === "analyzing" && <AnalyzingLoader />}

                                    {/* AI Score Badge */}
                                    {assessment.aiScore !== null && (
                                        <Badge variant="outline" className={`text-xs ${getScoreColor(assessment.aiScore)}`}>
                                            <Star className="w-3 h-3 mr-1 fill-current" />
                                            {assessment.aiScore}/4 - {getScoreLabel(assessment.aiScore)}
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
                                                    className={`flex gap-3 p-2 rounded-lg ${segment.speaker === "Interviewer" ? "bg-[#1e3a5f]/30" : "bg-[#6EACDA]/5"
                                                        }`}
                                                >
                                                    <button
                                                        onClick={() => setPlayingVideo(playingVideo === segment.id ? null : segment.id)}
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
                                                                className={`text-[10px] font-medium ${segment.speaker === "Interviewer" ? "text-[#6EACDA]" : "text-green-400"
                                                                    }`}
                                                            >
                                                                {segment.speaker}
                                                            </span>
                                                            <span className="text-[10px] text-[#6EACDA]/40">
                                                                {formatTime(segment.start)} - {formatTime(segment.end)}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-white/80 leading-relaxed">{segment.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* AI Analysis Result */}
                                    {assessment.status === "done" && assessment.aiScore !== null && (
                                        <div className={`p-4 rounded-lg border ${getScoreColor(assessment.aiScore)}`}>
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
                                                        <span className="text-lg font-bold text-white">{assessment.aiScore}/4</span>
                                                        <Badge variant="outline" className={getScoreColor(assessment.aiScore)}>
                                                            {getScoreLabel(assessment.aiScore)}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-white/80 leading-relaxed mb-4">{assessment.aiReason}</p>

                                                    <div className="grid grid-cols-3 gap-3">
                                                        {/* Strengths */}
                                                        <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-3">
                                                            <h5 className="text-xs font-medium text-green-400 mb-2">Strengths</h5>
                                                            <ul className="space-y-1">
                                                                {assessment.aiStrengths.map((s, i) => (
                                                                    <li key={i} className="text-[11px] text-white/70 flex items-start gap-1.5">
                                                                        <span className="text-green-400 mt-0.5">+</span>
                                                                        {s}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Weaknesses */}
                                                        <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-3">
                                                            <h5 className="text-xs font-medium text-yellow-400 mb-2">Areas to Improve</h5>
                                                            <ul className="space-y-1">
                                                                {assessment.aiWeaknesses.map((w, i) => (
                                                                    <li key={i} className="text-[11px] text-white/70 flex items-start gap-1.5">
                                                                        <span className="text-yellow-400 mt-0.5">-</span>
                                                                        {w}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Suggestions */}
                                                        <div className="bg-[#6EACDA]/5 border border-[#6EACDA]/20 rounded-lg p-3">
                                                            <h5 className="text-xs font-medium text-[#6EACDA] mb-2">Suggestions</h5>
                                                            <ul className="space-y-1">
                                                                {assessment.aiSuggestions.map((s, i) => (
                                                                    <li key={i} className="text-[11px] text-white/70 flex items-start gap-1.5">
                                                                        <span className="text-[#6EACDA] mt-0.5">→</span>
                                                                        {s}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Loading state while analyzing */}
                                    {assessment.status === "analyzing" && (
                                        <div className="p-6 rounded-lg border border-[#6EACDA]/30 bg-[#6EACDA]/5 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="relative mx-auto w-12 h-12 mb-3">
                                                    <Brain className="w-12 h-12 text-[#6EACDA] animate-pulse" />
                                                    <div className="absolute inset-0 rounded-full border-2 border-[#6EACDA]/30 border-t-[#6EACDA] animate-spin" />
                                                </div>
                                                <p className="text-sm text-[#6EACDA] font-medium">AI is analyzing this response...</p>
                                                <p className="text-xs text-[#6EACDA]/60 mt-1">Evaluating content, delivery, and relevance</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Bottom Summary */}
                {!isProcessing && completedAssessments === assessments.length && (
                    <Card className="mt-4 bg-[#0d1e30] border-[#1e3a5f] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EACDA]/20 to-[#6EACDA]/5 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-[#6EACDA]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Assessment Complete</h3>
                                    <p className="text-xs text-[#6EACDA]/60">
                                        Total Score: {totalScore}/{maxScore} | Average: {averageScore}/4
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {recommendation && (
                                    <Badge variant="outline" className={`${recommendation.color} px-3 py-1`}>
                                        {recommendation.label}
                                    </Badge>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#6EACDA]/30 text-[#6EACDA] hover:bg-[#6EACDA]/10 bg-transparent"
                                >
                                    <Download className="w-3.5 h-3.5 mr-1.5" />
                                    Export Report
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}
