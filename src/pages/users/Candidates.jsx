import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Eye,
    Grid,
    List,
    FileJson2,
    Trash2,
} from "lucide-react"

import DashboardLayout from "@/layouts/DashboardLayout"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useUploadStore } from "@/store/useUploadStore"

export default function CandidatesPage() {
    const { t } = useTranslation()

    const {
        payloads,
        payloadLoading,
        fetchPayloads,
        deletePayload,
    } = useUploadStore()

    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [viewMode, setViewMode] = useState("grid")
    const [deleteTarget, setDeleteTarget] = useState(null)

    useEffect(() => {
        fetchPayloads()
    }, [])


    const formatDateTime = (dateStr) => {
        if (!dateStr) return "-"
        return new Date(dateStr).toLocaleString("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
    }


    const candidates =
        payloads?.map((item) => ({
            id: item?.payload?.data?.id,

            name: item?.payload?.data?.candidate?.name || "-",
            email: item?.payload?.data?.candidate?.email || "-",
            avatar: item?.payload?.data?.candidate?.photoUrl || null,

            certification:
                item?.payload?.data?.certification?.abbreviatedType || "-",
            status:
                item?.payload?.data?.certification?.status?.toLowerCase() ||
                "pending",

            score: item?.payload?.data?.certification?.examScore || null,
            interviews:
                item?.payload?.data?.certification?.interviewQuestionSets || 0,

            position:
                item?.payload?.data?.certification?.normalType || "-",

            submittedAt:
                item?.payload?.data?.certification?.submittedAt || null,

            uploadedAt: item?.created_at || null,

            payloadId: item?.id,
        })) || []

    // console.log(payload);

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch =
            candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus =
            statusFilter === "all" || candidate.status === statusFilter

        return matchesSearch && matchesStatus
    })


    const getStatusBadge = (status) => {
        switch (status) {
            case "finished":
            case "passed":
                return (
                    <Badge className="bg-green-500/20 text-green-400">
                        Finished
                    </Badge>
                )
            case "in_review":
                return (
                    <Badge className="bg-blue-500/20 text-blue-400">
                        In Review
                    </Badge>
                )
            case "pending":
                return (
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                        Pending
                    </Badge>
                )
            case "rejected":
                return (
                    <Badge className="bg-red-500/20 text-red-400">
                        Rejected
                    </Badge>
                )
            default:
                return <Badge variant="outline">Unknown</Badge>
        }
    }


    const confirmDelete = async () => {
        if (!deleteTarget) return
        await deletePayload(deleteTarget)
        setDeleteTarget(null)
        fetchPayloads()
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 p-4 sm:p-8">

                {/* ================= HEADER ================= */}
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
                        <Button className="bg-[#6EACDA] hover:bg-[#5a9bc9] text-white w-full sm:w-auto">
                            <FileJson2 className="mr-2 h-4 w-4" />
                            {t("candidate.add")}
                        </Button>
                    </Link>
                </div>

                {/* ================= FILTER ================= */}
                <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder={t("candidate.search")}
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full border-[#6EACDA]/20 bg-[#021526] pl-10 text-white"
                                />
                            </div>

                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="w-full sm:w-40 border-[#6EACDA]/20 bg-[#021526] text-white">
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                    <SelectItem value="all">
                                        All
                                    </SelectItem>
                                    <SelectItem value="finished">
                                        Finished
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex gap-1 rounded-lg border border-[#6EACDA]/20 p-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ================= GRID VIEW ================= */}
                {viewMode === "grid" && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCandidates.map((candidate) => (
                            <Card
                                key={candidate.payloadId}
                                className="border-[#6EACDA]/20 bg-[#0a2a3f]"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage
                                                    src={
                                                        candidate.avatar ||
                                                        undefined
                                                    }
                                                />
                                                <AvatarFallback className="bg-[#6EACDA]/20 text-[#6EACDA]">
                                                    {candidate.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <h3 className="font-semibold text-white">
                                                    {candidate.name}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {candidate.position}
                                                </p>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        to={`/dashboard/assesment-result/${candidate.payloadId}`}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Detail
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    className="text-red-400"
                                                    onClick={() => setDeleteTarget(candidate.payloadId)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            <span>{candidate.email}</span>
                                        </div>

                                        <p>
                                            Submitted:{" "}
                                            {formatDateTime(
                                                candidate.submittedAt
                                            )}
                                        </p>
                                        <p>
                                            Uploaded:{" "}
                                            {formatDateTime(
                                                candidate.uploadedAt
                                            )}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(candidate.status)}
                                            <Badge
                                                variant="outline"
                                                className="border-[#6EACDA]/30 text-[#6EACDA]"
                                            >
                                                {candidate.certification}
                                            </Badge>
                                        </div>

                                        {candidate.score !== null && (
                                            <span className="text-sm font-medium text-[#6EACDA]">
                                                {candidate.score}%
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-[#6EACDA]/10">
                                        <Link
                                            to={`/dashboard/assesment-result/${candidate.payloadId}`}
                                        >
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-[#6EACDA]"
                                            >
                                                <Eye className="mr-1 h-3 w-3" />
                                                View Detail Candidate
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* ================= LIST VIEW ================= */}
                {viewMode === "list" && (
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardContent className="p-0">
                            <div className="divide-y divide-[#6EACDA]/10">
                                {filteredCandidates.map((candidate) => (
                                    <div
                                        key={candidate.payloadId}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4"
                                    >
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {candidate.name}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                {candidate.email}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {getStatusBadge(candidate.status)}

                                            <span className="text-xs text-gray-400">
                                                {formatDateTime(
                                                    candidate.submittedAt
                                                )}
                                            </span>

                                            <Link
                                                to={`/dashboard/assesment-result/${candidate.payloadId}`}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteTarget(candidate.payloadId)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-400" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {payloadLoading && (
                    <p className="text-center text-gray-400">
                        Loading data...
                    </p>
                )}
            </div>

            <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                <DialogContent className="bg-[#0a2a3f] border-[#6EACDA]/20">
                    <DialogHeader>
                        <DialogTitle className="text-white">
                            Konfirmasi Hapus
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-gray-400">
                        Apakah kamu yakin ingin menghapus payload ini?
                    </p>

                    <DialogFooter>
                        <Button variant="ghost" className="bg-slate-300 text-slate-900" onClick={() => setDeleteTarget(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    )
}
