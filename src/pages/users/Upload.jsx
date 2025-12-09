import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useTranslation } from "react-i18next"

import DashboardLayout from "@/layouts/DashboardLayout"
import { useUploadStore } from "@/store/useUploadStore"
import { uploadSchema } from "@/validations/uploadSchema"
import axiosInstance from "@/libs/axios"

import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router-dom";

import {
    Upload, FileJson, X, CheckCircle, AlertCircle, Loader2, Trash2, Eye,
} from "lucide-react"
import { toast } from "sonner"
import certificate from "@/data/certificate.json"
import JsonExampleDrawer from "@/components/section/HintJson"

export default function UploadPage() {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const {
        files,
        analysisResult,
        loading,
        payloads,
        payloadLoading,
        setFiles,
        clearFiles,
        setAnalysisResult,
        setLoading,
        fetchPayloads,
        deletePayload,
    } = useUploadStore()

    const [deleteTarget, setDeleteTarget] = useState(null)
    const [selectedPayload, setSelectedPayload] = useState(null)
    const [previewJson, setPreviewJson] = useState(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [payloadId, setPayloadId] = useState(null);

    useEffect(() => {
        fetchPayloads()
    }, [])

    const handleSelectPayload = (item) => {
        setSelectedPayload(item.payload)
        setPreviewJson(item.payload)
        setPayloadId(item.id);
        clearFiles()
        toast.success(t("upload.toast.success"))
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        const mapped = acceptedFiles.map((file) => ({
            file,
            progress: 0,
            status: "uploading",
        }))

        setFiles(mapped)
        setLoading(true)
        setPreviewJson(null)
        setSelectedPayload(null)

        try {
            const file = acceptedFiles[0]

            if (!file || file.type !== "application/json") {
                throw new Error(t("upload.errors.invalidFile"))
            }

            const text = await file.text()

            let json
            try {
                json = JSON.parse(text)
            } catch {
                throw new Error(t("upload.errors.invalidJson"))
            }

            await uploadSchema.validate(json, { abortEarly: false })

            const res = await axiosInstance.post("/payload/upload-payload", json, {
                headers: { "Content-Type": "application/json" },
            })

            setPreviewJson(res.data.payload);
            setPayloadId(res.data.id);

            setFiles((prev) =>
                prev.map((f) => ({
                    ...f,
                    progress: 100,
                    status: "completed",
                }))
            )

            toast.success(res.data?.message || t("upload.toast.success"))
            await fetchPayloads()
        } catch (err) {
            const errorMsg =
                err?.response?.data?.message ||
                err?.errors?.[0] ||
                err?.message ||
                t("upload.toast.failed")

            setPreviewJson({ success: false, error: errorMsg })

            setFiles((prev) =>
                prev.map((f) => ({
                    ...f,
                    progress: 100,
                    status: "failed",
                }))
            )

            toast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }, [t])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/json": [".json"] },
        maxFiles: 1,
    })

    // const handleStartAnalysis = async () => {
    //     try {
    //         if (!selectedPayload && !previewJson) return

    //         setIsAnalyzing(true)

    //         const json = selectedPayload || previewJson

    //         const res = await axiosInstance.post("/analysis/start", {
    //             payload: json,
    //         })

    //         setAnalysisResult(res.data)
    //         setPreviewJson(null)

    //         toast.success(t("upload.toast.success"))
    //     } catch (err) {
    //         const msg =
    //             err?.response?.data?.message ||
    //             err?.message ||
    //             t("upload.toast.failed")

    //         toast.error(msg)
    //     } finally {
    //         setIsAnalyzing(false)
    //     }
    // }


    const handleStartAnalysis = async () => {
        try {
            if (!selectedPayload && !previewJson) return;

            const json = selectedPayload || previewJson;

            const interviews = json.data.reviewChecklists.interviews;

            console.log('JSON', interviews);
            console.log("id PYALOAD", payloadId);

            navigate("/dashboard/upload/ai-analyzing", {
                state: {
                    payload: interviews,
                    payloadId: payloadId,
                },
            });
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                t("upload.toast.failed");

            toast.error(msg);
        }
    };



    const handleConfirmDelete = async () => {
        await deletePayload(deleteTarget.id)
        toast.success(t("upload.toast.success"))
        setDeleteTarget(null)
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 p-8">

                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {t("upload.title")}
                    </h1>
                    <p className="text-gray-400">{t("upload.subtitle")}</p>
                </div>

                <form className="grid gap-6 lg:grid-cols-2">

                    {/* UPLOAD */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <FileJson className="h-5 w-5 text-[#6EACDA]" />
                                {t("upload.jsonUpload")}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                {t("upload.description")}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div
                                {...getRootProps()}
                                className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${isDragActive
                                    ? "border-[#6EACDA] bg-[#6EACDA]/10"
                                    : "border-[#6EACDA]/30 hover:border-[#6EACDA]/60"
                                    }`}
                            >
                                <input {...getInputProps()} />
                                <Upload className="mx-auto h-10 w-10 text-[#6EACDA]" />
                                <p className="text-white mt-2">
                                    {isDragActive
                                        ? t("upload.dropHere")
                                        : t("upload.dragHere")}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {t("upload.fileRule")}
                                </p>
                            </div>

                            {files.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <FileJson className="text-[#6EACDA]" />
                                    <div className="flex-1">
                                        <p className="text-white text-sm">{item.file.name}</p>
                                        <Progress value={item.progress} className="h-1 mt-2" />
                                    </div>

                                    {loading && <Loader2 className="animate-spin text-[#6EACDA]" />}
                                    {!loading && item.status === "completed" && (
                                        <CheckCircle className="text-green-400" />
                                    )}

                                    <button type="button" onClick={clearFiles}>
                                        <X className="text-red-400" />
                                    </button>
                                </div>
                            ))}

                            <JsonExampleDrawer jsonExample={certificate} />
                        </CardContent>
                    </Card>

                    {/* ANALYSIS */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="text-white">
                                {t("upload.analysisTitle")}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {!previewJson && !analysisResult ? (
                                <div className="text-center text-gray-400 py-12">
                                    <AlertCircle className="mx-auto mb-3 text-[#6EACDA]" />
                                    {t("upload.noResult")}
                                </div>
                            ) : (
                                <pre className="bg-[#021526] p-4 text-xs text-green-400 rounded-lg max-h-[400px] overflow-auto border border-[#6EACDA]/20">
                                    {JSON.stringify(previewJson || analysisResult, null, 2)}
                                </pre>
                            )}

                            <Button
                                type="button"
                                onClick={handleStartAnalysis}
                                disabled={(!previewJson && !selectedPayload) || isAnalyzing}
                                className="w-full bg-[#6EACDA] hover:bg-[#5a9bc9] text-white"
                            >
                                <Upload className="mr-2" />
                                {isAnalyzing
                                    ? "Processing..."
                                    : t("upload.startAnalysis")}
                            </Button>
                        </CardContent>
                    </Card>
                </form>

                {/* RECENT */}
                <h2 className="text-xl font-bold text-white mt-4">
                    {t("upload.recenly.title")}
                </h2>

                <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                    <CardContent className="space-y-3">
                        {!payloadLoading &&
                            payloads.map((item) => {
                                const filename = item.file_url?.split("/").pop()
                                const createdAt = new Date(item.created_at).toLocaleString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })


                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-xl border border-[#6EACDA]/10 bg-[#021526] p-3 hover:border-[#6EACDA]/40 transition"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6EACDA]/20 shrink-0">
                                                <FileJson className="h-5 w-5 text-[#6EACDA]" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-white">
                                                    {filename}
                                                </p>
                                                <p className="text-xs text-gray-400">{createdAt}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-1">
                                            <div className="relative group">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleSelectPayload(item)}
                                                    className="hover:bg-[#6EACDA]/10"
                                                >
                                                    <Eye className="h-4 w-4 text-[#6EACDA]" />
                                                </Button>

                                                <span className="pointer-events-none absolute -top-8 right-0 scale-0 group-hover:scale-100 transition rounded-md bg-black px-2 py-1 text-xs text-white whitespace-nowrap">
                                                    {t("tooltip.preview-use")}
                                                </span>
                                            </div>

                                            <div className="relative group">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setDeleteTarget(item)}
                                                    className="hover:bg-red-400/10"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-400" />
                                                </Button>

                                                <span className="pointer-events-none absolute -top-8 right-0 scale-0 group-hover:scale-100 transition rounded-md bg-black px-2 py-1 text-xs text-white whitespace-nowrap">
                                                    {t("tooltip.delete")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </CardContent>
                </Card>


                {/* DELETE MODAL */}
                {deleteTarget && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-[#021526] p-6 rounded-xl w-[320px]">
                            <h3 className="text-white font-semibold mb-2">
                                {t("upload.confirmDelete")}
                            </h3>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
                                    {t("common.cancel")}
                                </Button>
                                <Button variant="destructive" onClick={handleConfirmDelete}>
                                    {t("common.delete")}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    )
}
