"use client"

import React, { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import {
    HiOutlineClock,
    HiOutlineUserGroup,
    HiOutlineChartBar,
    HiOutlineUser,
    HiOutlineCog,
    HiOutlineBell,
    HiChevronDown,
    HiOutlineDocumentText,
} from "react-icons/hi2"
import { CiSearch } from "react-icons/ci"
import { FiUpload } from "react-icons/fi"
import { LuUser } from "react-icons/lu";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu"
import { IoLogOut, IoChevronDownOutline } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { RiSettings2Line } from "react-icons/ri";

import { GoSidebarCollapse } from "react-icons/go"

import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { getAuthToken } from "@/hooks/useToken"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { useAuthUser } from "@/hooks/useAuth"

const mainNavItems = [
    { title: "Dashboard", to: "/dashboard", icon: LuLayoutDashboard },
    { title: "Upload", to: "/dashboard/upload", icon: FiUpload },
]

const manageNavItems = {
    title: "Manage",
    items: [
        { title: "Assesment Result", to: "/dashboard/assesment-result", icon: HiOutlineUserGroup },
        // { title: "Reports", to: "/dashboard/reports", icon: HiOutlineChartBar },
    ],
}

const accountNavItems = [
    { title: "Profile", to: "/dashboard/profile", icon: HiOutlineUser },
    { title: "Settings", to: "/dashboard/settings", icon: HiOutlineCog },
]

function ExpandedNavItem({ item, isActive }) {
    return (
        <NavLink
            to={item.to}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-[#6EACDA]/20 text-[#6EACDA]" : "text-gray-400 hover:bg-[#6EACDA]/10 hover:text-[#6EACDA]"
            )}
        >
            <item.icon className="h-4 w-4" />
            {item.title}
        </NavLink>
    )
}

export default function DashboardLayout({ children }) {
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()
    const { t } = useTranslation()
    const user = useAuthUser();
    const isLoading = !user;


    const avatarUrl =
        user?.user_metadata?.avatar_url ||
        user?.user_metadata?.picture

    const hasAvatar = Boolean(avatarUrl);


    const [isCollapsed, setIsCollapsed] = useState(false)
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = getAuthToken()?.access_token
        return !!token
    })

    const handleLogout = () => {
        localStorage.removeItem("sb-ewwozsikohikpbawgjuv-auth-token")
        document.cookie = "sb-ewwozsikohikpbawgjuv-auth-token=; path=/; max-age=0"
        setIsLoggedIn(false)
        navigate("/login")
    }

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-[#021526] flex">
                {/* Sidebar */}
                <aside
                    className={cn(
                        "fixed left-0 top-0 z-40 h-screen border-r border-[#6EACDA]/20 bg-[#021526] transition-all duration-300 hidden lg:flex flex-col",
                        isCollapsed ? "w-[72px]" : "w-58"
                    )}
                >
                    {/* Logo */}
                    <Link to="/">
                        <div className={cn(
                            "flex h-14 items-center border-b border-[#6EACDA]/20",
                            isCollapsed ? "justify-center px-2" : "gap-2 px-4"
                        )}>
                            <img src='/images/logo/sias.svg?v=1' className="w-11" />
                            {!isCollapsed && <span className="text-lg font-bold font-cushion text-white">SIAS</span>}
                        </div>
                    </Link>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-4">
                        {!isCollapsed ? (
                            <>
                                <Accordion type="multiple" defaultValue={["main", "manage", "account"]} className="space-y-2">
                                    {/* MAIN */}
                                    <AccordionItem value="main" className="border-none capitalize">
                                        <AccordionTrigger className="text-xs font-base hover:no-underline capitalize text-gray-500 hover:text-white border-none">
                                            Main
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-1 border-none">
                                            {mainNavItems.map((item) => (
                                                <ExpandedNavItem key={item.to} item={item} isActive={pathname === item.to} />
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* MANAGE */}
                                    <AccordionItem value="manage" className="border-none capitalize">
                                        <AccordionTrigger className="text-xs font-base hover:no-underline capitalize text-gray-500 hover:text-white border-none">
                                            Manage
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-1 border-none">
                                            {manageNavItems.items.map((item) => (
                                                <ExpandedNavItem key={item.to} item={item} isActive={pathname === item.to} />
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* ACCOUNT */}
                                    <AccordionItem value="account" className="border-none capitalize">
                                        <AccordionTrigger className="text-xs font-base hover:no-underline capitalize text-gray-500 hover:text-white border-none">
                                            Account
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-1 border-none">
                                            {accountNavItems.map((item) => (
                                                <ExpandedNavItem key={item.to} item={item} isActive={pathname === item.to} />
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {[...mainNavItems, ...manageNavItems.items, ...accountNavItems].map((item) => (
                                    <Tooltip key={item.to}>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={() => navigate(item.to)}
                                                className={`flex items-center justify-center rounded-lg p-2 ${pathname === item.to ? "bg-[#6EACDA]/20 text-[#6EACDA]" : "text-gray-400 hover:bg-[#6EACDA]/10"
                                                    }`}
                                            >
                                                <item.icon className="h-5 w-5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-[#0e314a] text-white border border-[#6EACDA]/30">
                                            {item.title}
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-[#6EACDA]/20 p-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn("flex w-full items-center gap-2 text-red-400", isCollapsed && "justify-center")}
                                    onClick={() => setLogoutDialogOpen(true)}
                                >
                                    <IoLogOut className="h-4 w-4" />
                                    {!isCollapsed && t("logout.component")}
                                </Button>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent className="bg-[#0e314a] text-white border border-[#6EACDA]/30">
                                    {t("logout.component")}
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </div>

                    <Button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="px-10 flex w-full justify-center rounded-lg border text-xs text-gray-400"
                    >
                        {isCollapsed ? <GoSidebarCollapse /> : <> <GoSidebarCollapse /> Collapse</>}
                    </Button>
                </aside>

                {/* Main content */}
                <main className={cn("flex-1 transition-all", isCollapsed ? "lg:ml-[72px]" : "lg:ml-56")}>
                    <header className="h-12 flex justify-between items-center gap-3 px-4 border-b border-[#6EACDA]/20 bg-[#021526]/90">
                        <div className="relative w-full max-w-md">
                            <CiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <Input placeholder="Search..." className="pl-8 bg-[#0a2a3f] border-[#6EACDA]/20 text-white" />
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Notifications */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative h-8 w-8 text-gray-400 hover:text-white">
                                        <HiOutlineBell className="h-4 w-4" />
                                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#6EACDA] text-[10px] font-medium text-white">
                                            3
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-72 border-[#6EACDA]/20 bg-[#0a2a3f]">
                                    <DropdownMenuLabel className="text-gray-400">Notifications</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-[#6EACDA]/20" />
                                    <DropdownMenuItem className="text-white cursor-pointer flex-col items-start gap-1">
                                        <span className="font-medium">Interview analysis complete</span>
                                        <span className="text-xs text-gray-400">Ahmad Fauzi - 2 min ago</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-white cursor-pointer flex-col items-start gap-1">
                                        <span className="font-medium">New candidate uploaded</span>
                                        <span className="text-xs text-gray-400">Siti Nurhaliza - 1 hour ago</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-white cursor-pointer flex-col items-start gap-1">
                                        <span className="font-medium">Weekly report ready</span>
                                        <span className="text-xs text-gray-400">System - 3 hours ago</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 gap-2 px-2 text-gray-400 hover:text-white">
                                        {isLoading ? (
                                            <>
                                                <Skeleton className="h-6 w-6 rounded-full" />
                                                <Skeleton className="h-4 w-24 rounded-md hidden md:inline-block" />
                                            </>
                                        ) : (
                                            <>
                                                <Avatar className="h-6 w-6">
                                                    {hasAvatar ? (
                                                        <AvatarImage
                                                            src={avatarUrl}
                                                            referrerPolicy="no-referrer"
                                                            onError={(e) => {
                                                                e.currentTarget.src = "/placeholder-user.jpg";
                                                            }}
                                                        />
                                                    ) : (
                                                        <AvatarFallback className="bg-[#6EACDA]/20 text-[#6EACDA] text-xs">
                                                            {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() ?? "U"}
                                                        </AvatarFallback>
                                                    )}
                                                </Avatar>


                                                <span className="hidden text-sm md:inline-block">
                                                    {user?.user_metadata?.full_name}
                                                </span>
                                            </>
                                        )}

                                        <IoChevronDownOutline className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-48 border-[#6EACDA]/20 bg-[#0a2a3f]">
                                    <DropdownMenuLabel className="text-gray-400">My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-[#6EACDA]/20" />

                                    <DropdownMenuItem asChild>
                                        <Link to="/dashboard/profile" className="text-white cursor-pointer">
                                            <LuUser className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link to="/dashboard/settings" className="text-white cursor-pointer">
                                            <RiSettings2Line className="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="bg-[#6EACDA]/20" />

                                    <DropdownMenuItem
                                        onClick={() => setLogoutDialogOpen(true)}
                                        className="text-red-400 cursor-pointer"
                                    >
                                        <LuLogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <div className="text-white">{children}</div>
                </main>

                <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                    <DialogContent className="bg-[#031b2a] border-[#6EACDA]/30 text-white">
                        <DialogHeader>
                            <DialogTitle>{t("logout.title")}</DialogTitle>
                        </DialogHeader>
                        <p className="text-gray-300 text-sm">{t("logout.message")}</p>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setLogoutDialogOpen(false)}>
                                {t("logout.cancel")}
                            </Button>
                            <Button variant="destructive" onClick={handleLogout}>
                                {t("logout.confirm")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
    )
}
