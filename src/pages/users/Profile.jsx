import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { useProfileQuery, useUpdateProfile } from "@/hooks/useProfile";
import FormDefault from "@/components/form/FormDefault";
import FormInput from "@/components/form/FormInput";
import { profileSchema } from "@/validations/userSchema";

import { Camera, Mail, Phone, Building, MapPin, Calendar, Shield, Save } from "lucide-react";
import { AiFillGithub, AiOutlineMail, AiFillGoogleCircle } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Link } from "react-router-dom"


const providerIcons = {
    github: <AiFillGithub className="w-4 h-4" />,
    email: <AiOutlineMail className="w-4 h-4" />,
    google: <AiFillGoogleCircle className="w-4 h-4" />,
    zoom: <FaVideo className="w-4 h-4" />,
};

export default function ProfilePage() {
    const { t } = useTranslation();
    const { data: profile, isLoading } = useProfileQuery();
    const updateProfile = useUpdateProfile();

    const [isEditing, setIsEditing] = useState(false);

    const storedProfile = JSON.parse(localStorage.getItem("app-profile") || "{}");


    // console.log("store profile", storedProfile)


    const defaultProfile = {
        fullName: storedProfile.fullname || "",
        email: storedProfile.email || "",
        phone: storedProfile.no_hp || "",
        company: storedProfile.instansi || "",
        department: "",
        position: storedProfile.jabatan || "",
        location: "",
        bio: storedProfile.bio || "",
    };


    const form = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: defaultProfile,
    });


    const watchedFullName = useWatch({ control: form.control, name: "fullName" });

    useEffect(() => {
        if (profile) {
            form.reset({
                fullName: profile.fullname || storedProfile.fullname || "",
                email: profile.email || storedProfile.email || "",
                phone: profile.no_hp || storedProfile.no_hp || "",
                company: profile.instansi || storedProfile.instansi || "",
                department: profile.department || "",
                position: profile.jabatan || storedProfile.jabatan || "",
                location: profile.location || storedProfile.location || "",
                bio: profile.bio || storedProfile.bio || "",
                instagram: profile.instagram || storedProfile.instagram || "",
                joinDate: profile.joinDate || storedProfile.joinDate || "",
                avatar_url: profile.avatar_url || storedProfile.avatar_url || "",
                provider: profile.provider || storedProfile.provider || "",
                providers: profile.providers || storedProfile.providers || [],
            });
        }
    }, [profile]);



    const handleSave = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        if (data.avatar_file) {
            formData.append("avatar", data.avatar_file);
        }

        updateProfile.mutate(formData, {
            onSuccess: (res) => {
                const mapped = {
                    fullname: res.data.fullName,
                    email: res.data.email,
                    no_hp: res.data.phone,
                    instansi: res.data.company,
                    jabatan: res.data.position,
                    bio: res.data.bio,
                    avatar_url: res.data.avatar_url,
                };
                localStorage.setItem("profile", JSON.stringify(mapped));
                setIsEditing(false);
            },
        });
    };

    // console.log(defaultProfile)

    const handleCancel = () => {
        if (profile) {
            form.reset({
                fullName: profile.fullname || "",
                email: profile.email || "",
                phone: profile.no_hp || "",
                company: profile.instansi || "",
                department: profile.department || "",
                position: profile.jabatan || "",
                location: profile.location || "",
                bio: profile.bio || "",
                instagram: profile.instagram || "",
                joinDate: profile.joinDate || "",
            });
        } else {
            form.reset();
        }
        setIsEditing(false);
    };


    if (isLoading && !storedProfile.fullname) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a2a3f]">
                <div className="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-[#021526] shadow-lg animate-pulse">

                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                        <div className="h-20 w-20 rounded-full bg-white/10" />
                    </div>

                    {/* Name */}
                    <div className="h-4 bg-white/10 rounded w-3/4 mx-auto mb-3" />

                    {/* Email */}
                    <div className="h-3 bg-white/10 rounded w-1/2 mx-auto mb-6" />

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <div className="h-10 flex-1 rounded-lg bg-white/10" />
                        <div className="h-10 flex-1 rounded-lg bg-white/10" />
                    </div>

                </div>
            </div>
        );
    }


    return (
        <DashboardLayout>
            <div className="space-y-6 p-8">
                {/* HEADER */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{t("profile.title")}</h1>
                        <p className="text-gray-400">{t("profile.description")}</p>
                    </div>

                    <div className="flex gap-2">
                        {isEditing && (
                            <Button
                                variant="outline"
                                className="border-red-500/50 text-red-400 hover:text-slate-100 hover:bg-red-700/80"
                                onClick={handleCancel}
                            >
                                {t("profile.isEditing.cancel")}
                            </Button>
                        )}

                        <Button
                            onClick={
                                isEditing
                                    ? form.handleSubmit(handleSave)
                                    : () => setIsEditing(true)
                            }
                            className={
                                isEditing
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-[#6EACDA] hover:bg-[#5a9bc9] text-white"
                            }
                        >
                            {isEditing ? (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> {t("profile.isEditing.true")}
                                </>
                            ) : (
                                t("profile.isEditing.false")
                            )}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* LEFT CARD */}
                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f] lg:col-span-1">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative">
                                    <Avatar className="h-24 w-24">
                                        {profile?.avatar_url || storedProfile.avatar_url ? (
                                            <AvatarImage
                                                src={profile?.avatar_url || storedProfile.avatar_url}
                                                referrerPolicy="no-referrer"
                                                onError={(e) => { e.currentTarget.src = "/placeholder-user.jpg"; }}
                                            />
                                        ) : (
                                            <AvatarFallback className="bg-[#6EACDA]/20 text-[#6EACDA] text-xs">
                                                {storedProfile.fullname?.charAt(0)?.toUpperCase() ?? "U"}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>


                                    {isEditing && (
                                        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#6EACDA] text-white hover:bg-[#5a9bc9]">
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                <h2 className="mt-4 text-xl font-semibold text-white">
                                    {watchedFullName}
                                </h2>

                                <p className="text-gray-400">{form.watch("position")}</p>

                                <Badge className="mt-2 bg-[#6EACDA]/20 text-[#6EACDA]">
                                    Professional Plan
                                </Badge>

                                {/* PROVIDERS */}
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {profile?.provider ? (
                                        (Array.isArray(profile?.provider) ? profile.provider : [profile?.provider]).map((p) => (
                                            <Badge
                                                key={p}
                                                className="flex items-center gap-1 bg-[#6EACDA]/20 text-[#6EACDA] text-xs"
                                            >
                                                {providerIcons[p.toLowerCase()] || null}
                                                {p.toUpperCase()}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Badge className="bg-[#6EACDA]/20 text-[#6EACDA] text-xs">-</Badge>
                                    )}
                                </div>

                                {/* Info lain */}
                                <div className="mt-6 w-full space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <Mail className="h-4 w-4" />
                                        <span>{form.watch("email")}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <Phone className="h-4 w-4" />
                                        <span>{form.watch("phone")}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <Building className="h-4 w-4" />
                                        <span>{form.watch("company")}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                        <span>{form.watch("location")}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <Calendar className="h-4 w-4" />
                                        <span className="font-semibold">
                                            {t("profile.joined")}{" "}
                                            {profile?.joinDate
                                                ? new Intl.DateTimeFormat("id-ID", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }).format(new Date(profile?.joinDate))
                                                : "-"}
                                        </span>
                                    </div>



                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {profile?.providers && profile?.providers.length > 0 ? (
                                            <Badge className="flex items-center gap-1 bg-[#6EACDA]/20 text-[#6EACDA] text-xs">
                                                {profile?.providers.map((p, idx) => (
                                                    <span key={p} className="flex items-center">
                                                        {providerIcons[p.toLowerCase()] || null}
                                                        {idx < profile?.providers.length - 1 && <span className="mx-0.5">,</span>}
                                                    </span>
                                                ))}

                                                <span>
                                                    {profile?.providers.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")}
                                                </span>
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-[#6EACDA]/20 text-[#6EACDA] text-xs">-</Badge>
                                        )}
                                    </div>


                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RIGHT FORM */}
                    <div className="space-y-6 lg:col-span-2">
                        <FormDefault form={form} schema={profileSchema} onSubmit={handleSave}>
                            {({ register, errors }) => (
                                <div className="space-y-6">
                                    {/* PERSONAL */}
                                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                        <CardHeader>
                                            <CardTitle className="text-white">
                                                {t("profile.profileDetail.personal_info")}
                                            </CardTitle>
                                            <CardDescription className="text-gray-400">
                                                {t("profile.profileDetail.personal_desc")}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <FormInput
                                                    label={t("profile.profileDetail.fullname")}
                                                    name="fullName"
                                                    register={register}
                                                    error={errors.fullName}
                                                    disabled={!isEditing}
                                                    className="bg-[#021526] border-[#6EACDA]/20 text-white"
                                                />

                                                <FormInput
                                                    label={t("profile.profileDetail.email")}
                                                    name="email"
                                                    register={register}
                                                    isReadOnly={true}
                                                    error={errors.email}

                                                    disabled={!isEditing}
                                                    className="bg-[#021526] border-[#6EACDA]/20 text-white"
                                                />

                                                <FormInput
                                                    label={t("profile.profileDetail.phone")}
                                                    name="phone"
                                                    register={register}
                                                    error={errors.phone}
                                                    disabled={!isEditing}
                                                    className="bg-[#021526] border-[#6EACDA]/20 text-white"
                                                />

                                                <FormInput
                                                    label={t("profile.profileDetail.location")}
                                                    name="location"
                                                    register={register}
                                                    error={errors.location}
                                                    disabled={!isEditing}
                                                    className="bg-[#021526] border-[#6EACDA]/20 text-white"
                                                />
                                            </div>

                                            {/* BIO */}
                                            <div>
                                                <label className="text-gray-300 block mb-2">
                                                    {t("profile.profileDetail.bio")}
                                                </label>

                                                <Textarea
                                                    {...register("bio")}
                                                    disabled={!isEditing}
                                                    className="min-h-[100px] bg-[#021526] border-[#6EACDA]/20 text-white disabled:opacity-70"
                                                />

                                                {errors.bio && (
                                                    <p className="text-red-400 text-sm mt-1">
                                                        {errors.bio.message}
                                                    </p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* WORK */}
                                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                        <CardHeader>
                                            <CardTitle className="text-white">
                                                {t("profile.workInfo.work_info")}
                                            </CardTitle>
                                            <CardDescription className="text-gray-400">
                                                {t("profile.workInfo.work_desc")}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <FormInput
                                                    label={t("profile.workInfo.company")}
                                                    name="company"
                                                    register={register}
                                                    error={errors.company}
                                                    disabled={!isEditing}
                                                    className="bg-[#021526] border-[#6EACDA]/20 text-white"
                                                />

                                                <FormInput
                                                    label={t("profile.workInfo.department")}
                                                    name="department"
                                                    register={register}
                                                    error={errors.department}
                                                    disabled={!isEditing}
                                                    className="bg-[#021526] border-[#6EACDA]/20 text-white"
                                                />

                                                <FormInput
                                                    label={t("profile.workInfo.position")}
                                                    name="position"
                                                    register={register}
                                                    error={errors.position}
                                                    disabled={!isEditing}
                                                    className="bg-[#021526] border-[#6EACDA]/20 text-white sm:col-span-2"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* SECURITY */}
                                    <Card className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-white">
                                                <Shield className="h-5 w-5 text-[#6EACDA]" />
                                                {t("profile.security")}
                                            </CardTitle>
                                            <CardDescription className="text-gray-400">
                                                {t("profile.security_desc")}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-white">
                                                        {t("profile.cpass.title")}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {t("profile.cpass.desc")} <b></b>
                                                    </p>
                                                </div>

                                                <Link to="/login">
                                                    <Button
                                                        variant="outline"
                                                        type="button"
                                                        className="border-[#6EACDA]/30 text-[#6EACDA] hover:bg-[#6EACDA]/10 bg-transparent"
                                                    >
                                                        {t("profile.cpass.button")}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </FormDefault>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
