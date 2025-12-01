import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OauthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token");

        if (!access_token) return navigate("/");

        axios.post(
            `${import.meta.env.VITE_API_ENDPOINT_URL}/api/oauth/callback`,
            { access_token }
        )
            .then((res) => {
                localStorage.setItem("sb-ewwozsikohikpbawgjuv-auth-token", access_token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/dashboard", { replace: true });
            })
            .catch(() => navigate("/"));
    }, [navigate]);

    return <p style={{ textAlign: "center" }}>Authenticating...</p>;
}
