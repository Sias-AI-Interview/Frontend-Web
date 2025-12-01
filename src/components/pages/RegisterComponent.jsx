import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Form from "../form/Form";
import FormInput from "../form/FormInput";
import { registerSchema } from "../../validations/userSchema";
import { useRegister } from '../../hooks/useAuth';
// import { useAuthStore } from '../../store/authStore';

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import gsap from "gsap";
import { toast } from "sonner";

const floatingOrbs = [
    { size: 280, color: "#2F66FF", glow: "#76A6FF", top: "5%", left: "50%" },
    { size: 150, color: "#6EACDA", glow: "#6EACDA", top: "15%", left: "8%" },
    { size: 100, color: "#4A90D9", glow: "#4A90D9", top: "10%", left: "88%" },
    { size: 70, color: "#2F66FF", glow: "#76A6FF", top: "80%", left: "5%" },
    { size: 120, color: "#6EACDA", glow: "#6EACDA", top: "85%", left: "92%" },
    { size: 50, color: "#4A90D9", glow: "#4A90D9", top: "50%", left: "3%" },
    { size: 60, color: "#76A6FF", glow: "#76A6FF", top: "90%", left: "20%" },
    { size: 90, color: "#6EACDA", glow: "#6EACDA", top: "25%", left: "95%" },
];

export default function RegisterPage() {

    const { t } = useTranslation();

    const formRef = useRef(null);
    const orbsRef = useRef(null);

    const registerMutation = useRegister();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isLoading = registerMutation.isPending;
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = () => {
        setLoading(true);
        window.location.href = `${import.meta.env.VITE_API_ENDPOINT_URL}/api/oauth/google`;
    };

    const handleGithubLogin = () => {
        setLoading(true);
        window.location.href = `${import.meta.env.VITE_API_ENDPOINT_URL}/api/oauth/github`;
    };

    const handleZoomLogin = () => {
        setLoading(true);
        window.location.href = `${import.meta.env.VITE_API_ENDPOINT_URL}/api/oauth/zoom`;
    };



    useEffect(() => {
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const handleRegister = (data) => {
        const payload = {
            fullname: data.fullName,
            email: data.email,
            password: data.password,
            confirm_password: data.confirmPassword,
        };

        registerMutation.mutate(payload, {
            onSuccess: (res) => {
                toast.success(res.message);
            },
            onError: (err) => {
                toast.error(err.message);
            },
        });
    };





    return (
        <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#021526" }}>

            {/* Glow BG */}
            <div
                className="absolute inset-0 opacity-35"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 55% 18%, rgba(110,172,218,0.38) 0%, rgba(110,172,218,0.18) 28%, transparent 55%)",
                    backgroundSize: "160% 160%",
                    filter: "blur(110px)",
                }}
            />

            {/* Orbs */}
            <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
                {floatingOrbs.map((orb, index) => (
                    <div
                        key={index}
                        className="orb absolute rounded-full"
                        style={{
                            width: orb.size,
                            height: orb.size,
                            top: orb.top,
                            left: orb.left,
                            background: `radial-gradient(circle at 30% 30%, ${orb.glow}40, ${orb.color}20, transparent 70%)`,
                            boxShadow: `0 0 ${orb.size / 2}px ${orb.glow}40, inset 0 0 ${orb.size / 3}px ${orb.glow}20`,
                            filter: "blur(1px)",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                ))}
            </div>

            {/* FORM */}
            <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-12">
                <div ref={formRef} className="w-full max-w-md">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EACDA] to-[#2F66FF] flex items-center justify-center">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-3xl font-bold text-white">SIAS</span>
                        </Link>

                        <h1 className="mt-6 text-3xl font-bold text-white">
                            {t("register.title")}
                        </h1>

                        <p className="mt-2 text-white/60">
                            {t("register.subtitle")}
                        </p>
                    </div>

                    {/* Card */}
                    <div
                        className="relative p-8 rounded-2xl border border-white/10 backdrop-blur-xl"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                        }}
                    >


                        <div className="space-y-3 mb-6">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className={`w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 ${loading ? "opacity-50 cursor-not-allowed" : "bg-white/5 hover:bg-white/10"
                                    } transition-all duration-300 group`}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-white/80 group-hover:text-white transition-colors">
                                    {loading ? "Redirecting..." : "Continue with Google"}
                                </span>
                            </button>

                            <button
                                onClick={handleGithubLogin}
                                disabled={loading}
                                className={`w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 ${loading ? "opacity-50 cursor-not-allowed" : "bg-white/5 hover:bg-white/10"
                                    } transition-all duration-300 group`}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 
    0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.74.08-.73.08-.73 
    1.17.08 1.79 1.2 1.79 1.2 1.04 1.8 2.73 1.28 3.4.98.11-.76.41-1.28.74-1.58-2.55-.29-5.23-1.28-5.23-5.7 
    0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 
    3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18 
    0 1.58-.02 2.85-.02 3.24 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z"/>
                                </svg>
                                <span className="text-white/80 group-hover:text-white transition-colors">
                                    {loading ? "Redirecting..." : "Continue with GitHub"}
                                </span>
                            </button>


                            <button
                                onClick={handleZoomLogin}
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 ${loading ? "opacity-50 cursor-not-allowed" : "bg-white/5 hover:bg-white/10 cursor-pointer"
                                    } transition-all duration-300 group`}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2D8CFF">
                                    <path d="M12 .5C5.65.5.55 5.63.55 12c0 6.37 5.1 11.5 11.45 11.5S23.45 18.37 23.45 12C23.45 5.63 18.35.5 12 .5zm4.6 7.15c1.09 0 1.97.88 1.97 1.97v4.76c0 1.09-.88 1.97-1.97 1.97h-2.87l-2.73 2.73a.56.56 0 01-.96-.4v-2.33H7.4a1.97 1.97 0 01-1.97-1.97V9.62c0-1.09.88-1.97 1.97-1.97h9.2z" />
                                </svg>

                                <span className="text-white/80 group-hover:text-white transition-colors">
                                    {loading ? "Redirecting..." : "Continue with Zoom"}
                                </span>
                            </button>

                        </div>

                        {/* Divider */}
                        <div className="relative flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-white/40 text-sm">or register with email</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>


                        {/* Form */}
                        <Form schema={registerSchema} onSubmit={handleRegister}>
                            {({ register, errors }) => (
                                <div className="space-y-5">

                                    <FormInput
                                        label={t("register.fullName")}
                                        name="fullName"
                                        register={register}
                                        error={errors.fullName}
                                        placeholder={t("register.fullNamePlaceholder")}
                                        iconLeft={<FaUser />}
                                    />

                                    <FormInput
                                        label={t("register.email")}
                                        name="email"
                                        register={register}
                                        error={errors.email}
                                        placeholder={t("register.emailPlaceholder")}
                                        iconLeft={<FaEnvelope />}
                                    />

                                    <FormInput
                                        label={t("register.password")}
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        register={register}
                                        error={errors.password}
                                        placeholder={t("register.passwordPlaceholder")}
                                        iconLeft={<FaLock />}
                                        iconRight={
                                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        }
                                    />

                                    <FormInput
                                        label={t("register.confirmPassword")}
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        register={register}
                                        error={errors.confirmPassword}
                                        placeholder={t("register.confirmPasswordPlaceholder")}
                                        iconLeft={<FaLock />}
                                        iconRight={
                                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        }
                                    />

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full py-3 rounded-xl bg-gradient-to-r from-[#6EACDA] to-[#2F66FF] text-white font-semibold shadow-lg shadow-blue-500/20`}
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                        ) : (
                                            t("register.createAccount")
                                        )}
                                    </button>



                                    {/* Link */}
                                    <p className="text-center text-white/60 mt-4">
                                        {t("register.alreadyHaveAccount")}{" "}
                                        <Link to="/login" className="text-[#6EACDA] font-medium hover:underline">
                                            {t("register.signIn")}
                                        </Link>
                                    </p>

                                </div>
                            )}
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    );
}
