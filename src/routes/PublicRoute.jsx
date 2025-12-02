import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/hooks/useToken";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PublicRoute({ children }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const session = getAuthToken();
            await Promise.resolve();
            setIsLoggedIn(!!session?.access_token);
            setLoading(false);
        };
        checkSession();
    }, []);

    if (loading)
        return (
            <div className="w-full h-screen flex flex-col bg-[#021526] items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {t("pageLoading.public.title")}
                    <span className="loading-dots ml-1 inline-block" />
                </p>
            </div>
        );

    return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
}
