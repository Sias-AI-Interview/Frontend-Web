"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

import {
    Users,
    FileVideo,
    CheckCircle,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Play,
    Calendar
} from "lucide-react";

const stats = [
    { title: "Total Candidates", value: "1,234", change: "+12%", trend: "up", icon: Users },
    { title: "Interviews Analyzed", value: "856", change: "+8%", trend: "up", icon: FileVideo },
    { title: "Completed Reviews", value: "642", change: "+15%", trend: "up", icon: CheckCircle },
    { title: "Pending Analysis", value: "23", change: "-5%", trend: "down", icon: Clock }
];

const recentInterviews = [
    { id: 1, candidate: "Ahmad Fauzi", position: "Software Engineer", score: 85, status: "completed", date: "2 hours ago" },
    { id: 2, candidate: "Siti Nurhaliza", position: "Product Manager", score: 92, status: "completed", date: "4 hours ago" },
    { id: 3, candidate: "Budi Santoso", position: "Data Analyst", score: null, status: "processing", date: "5 hours ago" },
    { id: 4, candidate: "Dewi Lestari", position: "UX Designer", score: 78, status: "completed", date: "1 day ago" },
    { id: 5, candidate: "Reza Rahadian", position: "Marketing Lead", score: null, status: "pending", date: "1 day ago" }
];

const upcomingInterviews = [
    { id: 1, candidate: "Maya Indah", position: "Frontend Developer", time: "Today, 14:00" },
    { id: 2, candidate: "Eko Prasetyo", position: "Backend Developer", time: "Today, 16:30" },
    { id: 3, candidate: "Putri Ayu", position: "HR Manager", time: "Tomorrow, 09:00" }
];

export default function Dashboard() {
    return (
        <>
            <DashboardLayout>
                <div className="space-y-6 p-5 text-white">
                    {/* Page Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-gray-400">Welcome back! Here&apos;s your recruitment overview.</p>
                        </div>

                        <Button className="bg-[#6EACDA] hover:bg-[#5a9bc9] text-white">
                            <Link to="/dashboard/upload" className="flex items-center gap-2">
                                <FileVideo className="h-4 w-4" />
                                Upload Interview
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <Card key={stat.title} className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                            <stat.icon className="h-6 w-6 text-[#6EACDA]" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                                            {stat.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                            {stat.change}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-gray-400">{stat.title}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Recent */}
                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f] lg:col-span-2">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Recent Interviews</CardTitle>
                                    <CardDescription className="text-gray-400">Latest analyzed interviews</CardDescription>
                                </div>
                                <Button variant="ghost" className="text-[#6EACDA] hover:text-[#6EACDA]/80">
                                    <Link to="/dashboard/history">View All</Link>
                                </Button>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    {recentInterviews.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6EACDA]/20 text-[#6EACDA] font-semibold">
                                                    {item.candidate.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-medium">{item.candidate}</p>
                                                    <p className="text-sm text-gray-400">{item.position}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    {item.score !== null ? (
                                                        <div className="flex items-center gap-2">
                                                            <Progress value={item.score} className="w-20 h-2 bg-[#6EACDA]/20" />
                                                            <span className="text-sm font-medium">{item.score}%</span>
                                                        </div>
                                                    ) : (
                                                        <Badge variant="outline" className={`${item.status === "processing" ? "border-yellow-500/50 text-yellow-400" : "border-gray-500/50 text-gray-400"}`}>
                                                            {item.status === "processing" ? "Processing" : "Pending"}
                                                        </Badge>
                                                    )}

                                                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                                                </div>
                                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#6EACDA]">
                                                    <Play className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming */}
                        <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                            <CardHeader>
                                <CardTitle>Upcoming Interviews</CardTitle>
                                <CardDescription className="text-gray-400">Scheduled for analysis</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingInterviews.map((item) => (
                                        <div key={item.id} className="flex items-start gap-3 rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                                <Calendar className="h-5 w-5 text-[#6EACDA]" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{item.candidate}</p>
                                                <p className="text-sm text-gray-400">{item.position}</p>
                                                <p className="text-xs text-[#6EACDA] mt-1">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button variant="outline" className="mt-4 w-full border-[#6EACDA]/30 text-[#6EACDA] hover:bg-[#6EACDA]/10">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    View Calendar
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
