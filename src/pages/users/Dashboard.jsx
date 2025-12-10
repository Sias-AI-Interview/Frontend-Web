"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
    Users,
    FileVideo,
    CheckCircle,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Play,
    Calendar,
} from "lucide-react";

import axiosInstance from "@/libs/axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const iconMap = {
    users: Users,
    "file-video": FileVideo,
    "check-circle": CheckCircle,
    clock: Clock,
};

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

export default function Dashboard() {
    const [stats, setStats] = useState([]);
    const [recentInterviews, setRecentInterviews] = useState([]);
    const [upcomingInterviews, setUpcomingInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openCalendar, setOpenCalendar] = useState(false);


    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axiosInstance.get("/dashboard/overview");

                if (res.data.success) {
                    const data = res.data.data;
                    setStats(data.stats || []);
                    setRecentInterviews(data.recentInterviews || []);
                    setUpcomingInterviews(data.upcomingInterviews || []);
                } else {
                    setError("Failed to load dashboard data");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);


    // console.log({ recentInterviews });

    return (
        <DashboardLayout>
            <div className="space-y-6 p-5 text-white">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-gray-400">
                            Welcome back! Here&apos;s your recruitment overview.
                        </p>
                    </div>

                    <Button className="bg-[#6EACDA] hover:bg-[#5a9bc9] text-white">
                        <Link to="/dashboard/upload" className="flex items-center gap-2">
                            <FileVideo className="h-4 w-4" />
                            Upload Interview
                        </Link>
                    </Button>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                        {error}
                    </div>
                )}

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {(loading && stats.length === 0 ? Array.from({ length: 4 }) : stats).map(
                        (stat, idx) => {
                            if (loading && stats.length === 0) {
                                return (
                                    <Card
                                        key={idx}
                                        className="border-[#6EACDA]/20 bg-[#0a2a3f] animate-pulse"
                                    >
                                        <CardContent className="p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="h-12 w-12 rounded-lg bg-[#6EACDA]/10" />
                                                <div className="h-4 w-12 bg-[#6EACDA]/10 rounded" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-6 w-20 bg-[#6EACDA]/10 rounded" />
                                                <div className="h-3 w-24 bg-[#6EACDA]/10 rounded" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            }

                            const IconComp = iconMap[stat.icon];

                            return (
                                <Card
                                    key={stat.title}
                                    className="border-[#6EACDA]/20 bg-[#0a2a3f]"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                                <IconComp className="h-6 w-6 text-[#6EACDA]" />
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${stat.trend === "up"
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                                    }`}
                                            >
                                                {stat.trend === "up" ? (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4" />
                                                )}
                                                {stat.change}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                                            <p className="text-sm text-gray-400">{stat.title}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        }
                    )}
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Interviews */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f] lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-white">Recent Interviews</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Latest analyzed interviews
                                </CardDescription>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-[#6EACDA] hover:text-[#6EACDA]/80"
                            >
                                <Link to="/dashboard/upload">View All</Link>
                            </Button>
                        </CardHeader>

                        <CardContent>
                            {loading && recentInterviews.length === 0 ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-4 animate-pulse"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-[#6EACDA]/10" />
                                                <div className="space-y-2">
                                                    <div className="h-4 w-32 bg-[#6EACDA]/10 rounded" />
                                                    <div className="h-3 w-24 bg-[#6EACDA]/10 rounded" />
                                                </div>
                                            </div>
                                            <div className="h-4 w-24 bg-[#6EACDA]/10 rounded" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentInterviews.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6EACDA]/20 text-[#6EACDA] font-semibold">
                                                    {item.candidate.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-medium text-white">{item.candidate}</p>
                                                    <p className="text-sm text-gray-400">
                                                        {item.position}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    {item.score !== null ? (
                                                        <div className="flex items-center gap-2">
                                                            <Progress
                                                                value={item.score}
                                                                className="w-50 h-2 bg-[#6EACDA]"
                                                            />
                                                            <span className="text-sm font-medium text-white">
                                                                {item.score}%
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className={`${item.status === "processing"
                                                                ? "border-yellow-500/50 text-yellow-400"
                                                                : "border-gray-500/50 text-gray-400"
                                                                }`}
                                                        >
                                                            {item.status === "processing"
                                                                ? "Processing"
                                                                : "Pending"}
                                                        </Badge>
                                                    )}

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatDate(item.date)}
                                                    </p>
                                                </div>
                                                <Link to={`/dashboard/assesment-result/${item.id}`}>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-gray-400 hover:text-[#6EACDA]"
                                                    >
                                                        <Play className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}

                                    {recentInterviews.length === 0 && !loading && (
                                        <p className="text-sm text-gray-500">
                                            No recent interviews found.
                                        </p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Upcoming Interviews */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                        <CardHeader>
                            <CardTitle className='text-white'>Upcoming Interviews</CardTitle>
                            <CardDescription className="text-gray-400">
                                Scheduled for analysis
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading && upcomingInterviews.length === 0 ? (
                                <div className="space-y-4 animate-pulse">
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-4"
                                        >
                                            <div className="h-10 w-10 rounded-lg bg-[#6EACDA]/10" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-32 bg-[#6EACDA]/10 rounded" />
                                                <div className="h-3 w-24 bg-[#6EACDA]/10 rounded" />
                                                <div className="h-3 w-20 bg-[#6EACDA]/10 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        {upcomingInterviews.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-start gap-3 rounded-lg border border-[#6EACDA]/10 bg-[#021526] p-4"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                                    <Calendar className="h-5 w-5 text-[#6EACDA]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-white">{item.candidate}</p>
                                                    <p className="text-sm text-gray-400">
                                                        {item.position}
                                                    </p>
                                                    <p className="text-xs text-[#6EACDA] mt-1">
                                                        {item.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        {upcomingInterviews.length === 0 && !loading && (
                                            <p className="text-sm text-gray-500">
                                                No upcoming interviews.
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={() => setOpenCalendar(true)}
                                        className="mt-4 w-full cursor-pointer hover:text-slate-200 border-[#6EACDA]/30 text-[#6EACDA] hover:bg-[#6EACDA]/10"
                                    >
                                        <Calendar className="mr-2 cursor-pointer h-4 w-4" />
                                        View Calendar
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Dialog open={openCalendar} onOpenChange={setOpenCalendar}>
                        <DialogContent className="max-w-xl border-[#6EACDA]/30 bg-[#021526] text-white">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-[#6EACDA]" />
                                    Upcoming Interviews
                                </DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Overview of scheduled interviews for the next days.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                {upcomingInterviews.length === 0 ? (
                                    <p className="text-sm text-gray-500">No upcoming interviews.</p>
                                ) : (
                                    upcomingInterviews.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-start gap-3 rounded-lg border border-[#6EACDA]/20 bg-[#0a2a3f] p-3"
                                        >
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6EACDA]/20">
                                                <Calendar className="h-4 w-4 text-[#6EACDA]" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-sm">{item.candidate}</p>
                                                        <p className="text-xs text-gray-400">{item.position}</p>
                                                    </div>
                                                    <span className="text-xs text-[#6EACDA] font-medium">
                                                        {item.time}
                                                    </span>
                                                </div>

                                                <div className="mt-2 flex justify-end">
                                                    <Link to={`/dashboard/assesment-result/${item.id}`}>
                                                        <Button
                                                            variant="outline"
                                                            size="xs"
                                                            className="border-[#6EACDA]/40 text-[#6EACDA] hover:bg-[#6EACDA]/10 text-xs h-7 px-2"
                                                        >
                                                            View detail
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </DashboardLayout>
    );
}
