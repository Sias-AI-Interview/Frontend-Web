import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../libs/supabaseClient";
import axiosInstance from "../../libs/axios";
import { toast } from "sonner";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const run = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (!data.session || error) {
                toast.error("Verifikasi gagal atau sudah kadaluarsa");
                return navigate("/login");
            }

            const accessToken = data.session.access_token;

            const res = await axiosInstance.post("/auth/sso", {
                access_token: accessToken,
            });

            localStorage.setItem("app_token", res.data.token);

            toast.success("Berhasil verifikasi, Selamat datang!");
            navigate("/dashboard");
        };

        run();
    }, []);

    return <p>Memproses verifikasi...</p>;
}
