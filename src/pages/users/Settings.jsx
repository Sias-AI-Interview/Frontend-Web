import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Globe, Lock, Palette, Trash2, Download, CreditCard } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import LanguageSwitcherUser from "@/components/translations/SwitcherUser"
import { Brain } from "lucide-react"

export default function SettingsPage() {
    const { t } = useTranslation()

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        weekly: false,
        newCandidate: true,
        analysisComplete: true,
    })

    return (
        <DashboardLayout>


            <div className="space-y-6 p-8">

                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-white">{t("settings.title")}</h1>
                    <p className="text-gray-400">{t("settings.subtitle")}</p>
                </div>

                <div className="grid gap-6">
                    {/* Notifications */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Bell className="h-5 w-5 text-[#6EACDA]" />
                                {t("settings.notifications.title")}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                {t("settings.notifications.desc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Email */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{t("settings.notifications.email")}</p>
                                    <p className="text-sm text-gray-400">{t("settings.notifications.email_desc")}</p>
                                </div>
                                <Switch
                                    checked={notifications.email}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, email: checked })
                                    }
                                />
                            </div>

                            <Separator className="bg-[#6EACDA]/20" />

                            {/* Push */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{t("settings.notifications.push")}</p>
                                    <p className="text-sm text-gray-400">{t("settings.notifications.push_desc")}</p>
                                </div>
                                <Switch
                                    checked={notifications.push}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, push: checked })
                                    }
                                />
                            </div>

                            <Separator className="bg-[#6EACDA]/20" />

                            {/* Weekly */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{t("settings.notifications.weekly")}</p>
                                    <p className="text-sm text-gray-400">{t("settings.notifications.weekly_desc")}</p>
                                </div>
                                <Switch
                                    checked={notifications.weekly}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, weekly: checked })
                                    }
                                />
                            </div>

                            <Separator className="bg-[#6EACDA]/20" />

                            {/* New Candidate */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{t("settings.notifications.new_candidate")}</p>
                                    <p className="text-sm text-gray-400">
                                        {t("settings.notifications.new_candidate_desc")}
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.newCandidate}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, newCandidate: checked })
                                    }
                                />
                            </div>

                            <Separator className="bg-[#6EACDA]/20" />

                            {/* Analysis */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{t("settings.notifications.analysis")}</p>
                                    <p className="text-sm text-gray-400">
                                        {t("settings.notifications.analysis_desc")}
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.analysisComplete}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, analysisComplete: checked })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Appearance */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Palette className="h-5 w-5 text-[#6EACDA]" />
                                {t("settings.appearance.title")}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                {t("settings.appearance.desc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-gray-300">{t("settings.appearance.theme")}</Label>
                                    <Select defaultValue="dark">
                                        <SelectTrigger className="border-[#6EACDA]/20 bg-[#021526] text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                            <SelectItem value="dark">{t("theme.dark")}</SelectItem>
                                            <SelectItem value="light">{t("theme.light")}</SelectItem>
                                            <SelectItem value="system">{t("theme.system")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <LanguageSwitcherUser />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Lock className="h-5 w-5 text-[#6EACDA]" />
                                {t("settings.security.title")}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                {t("settings.security.desc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{t("settings.security.2fa")}</p>
                                    <p className="text-sm text-gray-400">{t("settings.security.2fa_desc")}</p>
                                </div>
                                <Button variant="outline" className="border-[#6EACDA]/30 text-[#6EACDA]">
                                    {t("common.enable")}
                                </Button>
                            </div>

                            <Separator className="bg-[#6EACDA]/20" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{t("settings.security.sessions")}</p>
                                    <p className="text-sm text-gray-400">
                                        {t("settings.security.sessions_desc")}
                                    </p>
                                </div>
                                <Button variant="outline" className="border-[#6EACDA]/30 text-[#6EACDA]">
                                    {t("common.view_all")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Billing */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <CreditCard className="h-5 w-5 text-[#6EACDA]" />
                                {t("settings.billing.title")}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                {t("settings.billing.desc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border border-[#6EACDA]/20 bg-[#021526] p-4 flex justify-between">
                                <div>
                                    <p className="font-semibold text-white">
                                        {t("settings.billing.plan")}
                                    </p>
                                    <p className="text-sm text-gray-400">$49/month</p>
                                </div>
                                <Button className="bg-[#6EACDA] text-white">
                                    {t("common.upgrade")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Globe className="h-5 w-5 text-[#6EACDA]" />
                                {t("settings.data.title")}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                {t("settings.data.desc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{t("settings.data.export")}</p>
                                    <p className="text-sm text-gray-400">
                                        {t("settings.data.export_desc")}
                                    </p>
                                </div>
                                <Button variant="outline" className="border-[#6EACDA]/30 text-[#6EACDA]">
                                    <Download className="mr-2 h-4 w-4" />
                                    {t("common.export")}
                                </Button>
                            </div>

                            <Separator className="bg-[#6EACDA]/20" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-red-400">{t("settings.data.delete")}</p>
                                    <p className="text-sm text-gray-400">
                                        {t("settings.data.delete_desc")}
                                    </p>
                                </div>
                                <Button variant="outline" className="border-red-500/30 text-red-400">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {t("common.delete")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
