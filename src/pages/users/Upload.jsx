import { useCallback } from "react"
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

import {
    Upload, FileJson, X, CheckCircle, AlertCircle, Loader2,
} from "lucide-react"
import { toast } from "sonner"
import certificate from "@/data/certificate.json"
import JsonExampleDrawer from "@/components/section/HintJson"

export default function UploadPage() {
    const { t } = useTranslation()

    const {
        files,
        analysisResult,
        loading,
        setFiles,
        clearFiles,
        setAnalysisResult,
        setLoading,
    } = useUploadStore()

    const onDrop = useCallback(async (acceptedFiles) => {
        const mapped = acceptedFiles.map((file) => ({
            file,
            progress: 0,
            status: "uploading",
        }))

        setFiles(mapped)
        setLoading(true)

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

            const res = await axiosInstance.post(
                "/payload/upload-payload",
                json,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            setAnalysisResult(res.data)

            setFiles((prev) =>
                prev.map((f) => ({
                    ...f,
                    progress: 100,
                    status: "completed",
                }))
            )

            toast.success(res.data?.message || t("upload.toast.success"))
        } catch (err) {
            const errorMsg =
                err?.response?.data?.message ||
                err?.errors?.[0] ||
                err?.message ||
                t("upload.toast.failed")

            setAnalysisResult({
                success: false,
                error: errorMsg,
            })

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
        accept: {
            "application/json": [".json"],
        },
        maxFiles: 1,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 p-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {t("upload.title")}
                    </h1>
                    <p className="text-gray-400">
                        {t("upload.subtitle")}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">

                    {/* LEFT CARD */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f] relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#6EACDA]/10 via-transparent to-transparent" />

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
                                className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200 ${isDragActive
                                        ? "border-[#6EACDA] bg-[#6EACDA]/10 scale-[1.01]"
                                        : "border-[#6EACDA]/30 hover:border-[#6EACDA]/60 hover:bg-[#6EACDA]/5"
                                    }`}
                            >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#6EACDA]/20">
                                        <Upload className="h-8 w-8 text-[#6EACDA]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">
                                            {isDragActive
                                                ? t("upload.dropHere")
                                                : t("upload.dragHere")}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {t("upload.fileRule")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {files.length > 0 && (
                                <div className="space-y-3">
                                    {files.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-3"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                                <FileJson className="h-5 w-5 text-[#6EACDA]" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="truncate text-sm font-medium text-white">
                                                    {item.file.name}
                                                </p>
                                                <Progress value={item.progress} className="h-1.5 mt-2" />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {loading && <Loader2 className="h-5 w-5 animate-spin text-[#6EACDA]" />}
                                                {!loading && item.status === "completed" && (
                                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={clearFiles}
                                                    className="text-gray-400 hover:text-red-400"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <JsonExampleDrawer jsonExample={certificate} />

                        </CardContent>
                    </Card>

                    {/* RIGHT CARD */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="text-white">
                                {t("upload.analysisTitle")}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                {t("upload.jsonOutput")}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {!analysisResult ? (
                                <div className="flex flex-col items-center justify-center text-center py-12 text-gray-400">
                                    <AlertCircle className="mb-3 h-10 w-10 text-[#6EACDA]" />
                                    <p className="text-sm">{t("upload.noResult")}</p>
                                </div>
                            ) : (
                                <pre className="max-h-[400px] overflow-auto rounded-lg bg-[#021526] p-4 text-xs text-green-400 border border-[#6EACDA]/20">
                                    {JSON.stringify(analysisResult, null, 2)}
                                </pre>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-[#6EACDA] hover:bg-[#5a9bc9] text-white"
                                disabled={!files.length || loading}
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                {t("upload.startAnalysis")}
                            </Button>
                        </CardContent>
                    </Card>

                </form>
            </div>
        </DashboardLayout>
    )
}
