"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Mail, Phone, Eye, Grid, List } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { Link } from "react-router-dom"
import { FileJson2 } from "lucide-react"
import { useTranslation } from "react-i18next"

const candidates = [
    {
        id: 1,
        name: "Ahmad Fauzi",
        email: "ahmad.fauzi@email.com",
        phone: "+62 812-3456-7890",
        position: "Software Engineer",
        department: "Engineering",
        status: "hired",
        score: 85,
        interviews: 2,
        avatar: null,
    },
    {
        id: 2,
        name: "Siti Nurhaliza",
        email: "siti.nurhaliza@email.com",
        phone: "+62 813-4567-8901",
        position: "Product Manager",
        department: "Product",
        status: "hired",
        score: 92,
        interviews: 3,
        avatar: null,
        certification: "PM",
    },
    {
        id: 3,
        name: "Budi Santoso",
        email: "budi.santoso@email.com",
        phone: "+62 814-5678-9012",
        position: "Data Analyst",
        department: "Engineering",
        status: "pending",
        score: null,
        interviews: 1,
        avatar: null,
        certification: "DA",
    },
    {
        id: 4,
        name: "Dewi Lestari",
        email: "dewi.lestari@email.com",
        phone: "+62 815-6789-0123",
        position: "UX Designer",
        department: "Design",
        status: "rejected",
        score: 78,
        interviews: 2,
        avatar: null,
        certification: "UX",
    },
    {
        id: 5,
        name: "Reza Rahadian",
        email: "reza.rahadian@email.com",
        phone: "+62 816-7890-1234",
        position: "Marketing Lead",
        department: "Marketing",
        status: "in_review",
        score: 81,
        interviews: 2,
        avatar: null,
        certification: "FE",
    },
    {
        id: 6,
        name: "Maya Indah",
        email: "maya.indah@email.com",
        phone: "+62 817-8901-2345",
        position: "Frontend Developer",
        department: "Engineering",
        status: "hired",
        score: 88,
        interviews: 3,
        avatar: null,
        certification: "FE",
    },
    {
        id: 131,
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "+62 812-3456-7890",
        position: "Machine Learning Developer",
        department: "Engineering",
        status: "in_review",
        score: 94.33,
        interviews: 5,
        avatar: null,
        certification: "DCML",
    },
]


export default function CandidatesPage() {
    const { t } = useTranslation()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [viewMode, setViewMode] = useState()

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch =
            candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.position.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case "hired":
                return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Hired</Badge>
            case "in_review":
                return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">In Review</Badge>
            case "pending":
                return <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">Pending</Badge>
            case "rejected":
                return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">Rejected</Badge>
            default:
                return null
        }
    }

    return (
        <>
            <DashboardLayout>
                <div className="space-y-6 p-8">
                    {/* Page Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {t("candidate.title")}
                            </h1>
                            <p className="text-gray-400">
                                {t("candidate.subtitle")}
                            </p>
                        </div>

                        <Link to="/dashboard/upload">
                            <Button className="bg-[#6EACDA] hover:bg-[#5a9bc9] text-white">
                                <FileJson2 className="mr-2 h-4 w-4" />
                                {t("candidate.add")}
                            </Button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        type="search"
                                        placeholder={t("candidate.search")}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full border-[#6EACDA]/20 bg-[#021526] pl-10 text-white placeholder:text-gray-500"
                                    />
                                </div>

                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full sm:w-40 border-[#6EACDA]/20 bg-[#021526] text-white">
                                        <Filter className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder={t("candidate.status")} />
                                    </SelectTrigger>

                                    <SelectContent className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                        <SelectItem value="all">{t("status.all")}</SelectItem>
                                        <SelectItem value="hired">{t("status.hired")}</SelectItem>
                                        <SelectItem value="in_review">{t("status.in_review")}</SelectItem>
                                        <SelectItem value="pending">{t("status.pending")}</SelectItem>
                                        <SelectItem value="rejected">{t("status.rejected")}</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex gap-1 rounded-lg border border-[#6EACDA]/20 p-1">
                                    <Button variant="ghost" size="sm" onClick={() => setViewMode("grid")}>
                                        <Grid className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setViewMode("list")}>
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    {/* Candidates Grid/List */}
                    {viewMode === "grid" ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredCandidates.map((candidate) => (
                                <Card
                                    key={candidate.id}
                                    className="border-[#6EACDA]/20 bg-[#0a2a3f] hover:border-[#6EACDA]/40 transition-colors"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={candidate.avatar || undefined} />
                                                    <AvatarFallback className="bg-[#6EACDA]/20 text-[#6EACDA]">
                                                        {candidate.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-semibold text-white">{candidate.name}</h3>
                                                    <p className="text-sm text-gray-400">{candidate.position}</p>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                                    <DropdownMenuItem asChild className="text-white cursor-pointer">
                                                        <Link href={`/dashboard/assesment-result/${candidate.id}`}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Profile
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-white cursor-pointer">
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Send Email
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Mail className="h-4 w-4" />
                                                <span className="truncate">{candidate.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Phone className="h-4 w-4" />
                                                <span>{candidate.phone}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(candidate.status)}
                                                <Badge variant="outline" className="border-[#6EACDA]/30 text-[#6EACDA]">
                                                    {candidate.certification}
                                                </Badge>
                                            </div>
                                            {candidate.score !== null && (
                                                <span className="text-sm font-medium text-[#6EACDA]">{candidate.score}%</span>
                                            )}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-[#6EACDA]/10">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm">
                                                    <span className="text-gray-400">Interviews: </span>
                                                    <span className="text-white">{candidate.interviews}</span>
                                                </div>
                                                <Link to={`/dashboard/assesment-result/${candidate.id}`}>
                                                    <Button size="sm" variant="ghost" className="text-[#6EACDA] hover:bg-[#6EACDA]/10 hover:text-white">
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        View Detail Candidate
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardContent className="p-0">
                                <div className="divide-y divide-[#6EACDA]/10">
                                    {filteredCandidates.map((candidate) => (
                                        <div key={candidate.id} className="flex items-center justify-between p-4 hover:bg-[#6EACDA]/5">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={candidate.avatar || undefined} />
                                                    <AvatarFallback className="bg-[#6EACDA]/20 text-[#6EACDA]">
                                                        {candidate.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-medium text-white">{candidate.name}</h3>
                                                    <p className="text-sm text-gray-400">
                                                        {candidate.position} • {candidate.department}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="text-sm text-gray-400 hidden md:block">{candidate.email}</span>
                                                <Badge variant="outline" className="border-[#6EACDA]/30 text-[#6EACDA] hidden sm:flex">
                                                    {candidate.certification}
                                                </Badge>
                                                {getStatusBadge(candidate.status)}
                                                {candidate.score !== null && (
                                                    <span className="text-sm font-medium text-[#6EACDA] hidden sm:block">{candidate.score}%</span>
                                                )}
                                                <Link to={`/dashboard/assesment-result/${candidate.id}`}>
                                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-[#0a2a3f]/80 hover:text-white">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

            </DashboardLayout>
        </>
    )
}
