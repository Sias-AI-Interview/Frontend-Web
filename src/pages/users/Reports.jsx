
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, Clock, Download, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"

const departmentStats = [
    { name: "Engineering", candidates: 45, hired: 12, avgScore: 82 },
    { name: "Product", candidates: 28, hired: 8, avgScore: 78 },
    { name: "Design", candidates: 22, hired: 6, avgScore: 85 },
    { name: "Marketing", candidates: 35, hired: 10, avgScore: 76 },
    { name: "Sales", candidates: 40, hired: 15, avgScore: 74 },
]

const monthlyTrends = [
    { month: "Jan", interviews: 45, hired: 8 },
    { month: "Feb", interviews: 52, hired: 10 },
    { month: "Mar", interviews: 48, hired: 9 },
    { month: "Apr", interviews: 61, hired: 14 },
    { month: "May", interviews: 55, hired: 11 },
    { month: "Jun", interviews: 70, hired: 16 },
]

export default function ReportsPage() {
    return (
        <>
            <DashboardLayout>
                <div className="space-y-6 p-8">
                    {/* Page Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Reports</h1>
                            <p className="text-gray-400">Analytics and insights for your hiring</p>
                        </div>
                        <div className="flex gap-3">
                            <Select defaultValue="30">
                                <SelectTrigger className="w-40 border-[#6EACDA]/20 bg-[#0a2a3f] text-white">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                    <SelectItem value="7">Last 7 days</SelectItem>
                                    <SelectItem value="30">Last 30 days</SelectItem>
                                    <SelectItem value="90">Last 90 days</SelectItem>
                                    <SelectItem value="365">Last year</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" className="border-[#6EACDA]/30 text-[#6EACDA] hover:bg-[#6EACDA]/10 bg-transparent">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                        <Users className="h-6 w-6 text-[#6EACDA]" />
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-green-400">
                                        <ArrowUpRight className="h-4 w-4" />
                                        +18%
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-2xl font-bold text-white">51</p>
                                    <p className="text-sm text-gray-400">Total Hired</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                        <BarChart3 className="h-6 w-6 text-[#6EACDA]" />
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-green-400">
                                        <ArrowUpRight className="h-4 w-4" />
                                        +5%
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-2xl font-bold text-white">79%</p>
                                    <p className="text-sm text-gray-400">Avg. Score</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                        <Clock className="h-6 w-6 text-[#6EACDA]" />
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-red-400">
                                        <ArrowDownRight className="h-4 w-4" />
                                        -12%
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-2xl font-bold text-white">4.2 days</p>
                                    <p className="text-sm text-gray-400">Avg. Time to Hire</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                        <TrendingUp className="h-6 w-6 text-[#6EACDA]" />
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-green-400">
                                        <ArrowUpRight className="h-4 w-4" />
                                        +8%
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-2xl font-bold text-white">32%</p>
                                    <p className="text-sm text-gray-400">Conversion Rate</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Row */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Monthly Trends */}
                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardHeader>
                                <CardTitle className="text-white">Monthly Trends</CardTitle>
                                <CardDescription className="text-gray-400">Interviews and hiring over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {monthlyTrends.map((item) => (
                                        <div key={item.month} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-400">{item.month}</span>
                                                <span className="text-white">
                                                    {item.interviews} interviews / {item.hired} hired
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Progress value={(item.interviews / 70) * 100} className="h-2 flex-1 bg-[#6EACDA]/20" />
                                                <Progress value={(item.hired / 16) * 100} className="h-2 w-20 bg-green-500/20" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Department Performance */}
                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardHeader>
                                <CardTitle className="text-white">Department Performance</CardTitle>
                                <CardDescription className="text-gray-400">Hiring metrics by department</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {departmentStats.map((dept) => (
                                        <div
                                            key={dept.name}
                                            className="flex items-center justify-between rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-4"
                                        >
                                            <div>
                                                <p className="font-medium text-white">{dept.name}</p>
                                                <p className="text-sm text-gray-400">{dept.candidates} candidates</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-white">{dept.hired} hired</p>
                                                    <p className="text-xs text-gray-400">{Math.round((dept.hired / dept.candidates) * 100)}% rate</p>
                                                </div>
                                                <Badge
                                                    className={`${dept.avgScore >= 80
                                                        ? "bg-green-500/20 text-green-400"
                                                        : dept.avgScore >= 70
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : "bg-red-500/20 text-red-400"
                                                        }`}
                                                >
                                                    {dept.avgScore}%
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Score Distribution */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className="text-white">Score Distribution</CardTitle>
                            <CardDescription className="text-gray-400">
                                Distribution of candidate scores across all interviews
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-5">
                                {[
                                    { range: "90-100", count: 45, color: "bg-green-500" },
                                    { range: "80-89", count: 82, color: "bg-green-400" },
                                    { range: "70-79", count: 120, color: "bg-yellow-400" },
                                    { range: "60-69", count: 65, color: "bg-orange-400" },
                                    { range: "Below 60", count: 28, color: "bg-red-400" },
                                ].map((item) => (
                                    <div key={item.range} className="rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-4 text-center">
                                        <div className={`mx-auto mb-3 h-3 w-3 rounded-full ${item.color}`} />
                                        <p className="text-2xl font-bold text-white">{item.count}</p>
                                        <p className="text-sm text-gray-400">{item.range}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DashboardLayout>
        </>
    )
}
