import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPasswordPage() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async (data) => {
        setIsLoading(true);

        await new Promise((res) => setTimeout(res, 1500));

        console.log("RESET PASSWORD DATA:", data);

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#021526]">
            <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 backdrop-blur-xl"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                }}
            >

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        {t("resetPassword.title")}
                    </h1>
                    <p className="text-white/60 mt-2">
                        {t("resetPassword.subtitle")}
                    </p>
                </div>

                <Form schema={resetPasswordSchema} onSubmit={handleReset}>
                    {({ register, errors }) => (
                        <div className="space-y-5">

                            {/* Password */}
                            <FormInput
                                label={t("resetPassword.password")}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder={t("resetPassword.passwordPlaceholder")}
                                register={register}
                                error={errors.password}
                                iconLeft={<FaLock />}
                                iconRight={
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                }
                            />

                            {/* Confirm Password */}
                            <FormInput
                                label={t("resetPassword.confirmPassword")}
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                                register={register}
                                error={errors.confirmPassword}
                                iconLeft={<FaLock />}
                                iconRight={
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                }
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6EACDA] to-[#2F66FF] text-white font-semibold shadow-lg shadow-blue-500/20"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                ) : (
                                    t("resetPassword.submit")
                                )}
                            </button>

                            <p className="text-center text-white/60 mt-4">
                                <Link to="/login" className="text-[#6EACDA] hover:underline">
                                    {t("resetPassword.backToLogin")}
                                </Link>
                            </p>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}
