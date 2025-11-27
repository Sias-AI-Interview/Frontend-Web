import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import { forgotPasswordSchema } from "../../validations/userSchema";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPasswordPage() {
    const { t } = useTranslation();
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const handleForgotPassword = async (data) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("FORGOT PASSWORD EMAIL:", data);
        setLoading(false);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: "#021526" }}>
            <div ref={formRef} className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EACDA] to-[#2F66FF] flex items-center justify-center">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-3xl font-bold text-white">SIAS</span>
                    </Link>

                    <h1 className="mt-6 text-3xl font-bold text-white">{t("forgotPassword.title")}</h1>
                    <p className="mt-2 text-white/60">{t("forgotPassword.subtitle")}</p>
                </div>

                {/* Form Card */}
                <div
                    className="relative p-8 rounded-2xl border border-white/10 backdrop-blur-xl"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    }}
                >
                    <Form schema={forgotPasswordSchema} onSubmit={handleForgotPassword}>
                        {({ register, errors }) => (
                            <div className="space-y-5">
                                <FormInput
                                    label={t("forgotPassword.email")}
                                    name="email"
                                    register={register}
                                    error={errors.email}
                                    placeholder={t("forgotPassword.emailPlaceholder")}
                                    iconLeft={<FaEnvelope />}
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6EACDA] to-[#2F66FF] text-white font-semibold shadow-lg shadow-blue-500/20"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                    ) : (
                                        t("forgotPassword.reset")
                                    )}
                                </button>

                                <p className="text-center text-white/60 mt-4">
                                    {t("forgotPassword.rememberPassword")} {" "}
                                    <Link to="/login" className="text-[#6EACDA] font-medium hover:underline">
                                        {t("forgotPassword.backToLogin")}
                                    </Link>
                                </p>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
