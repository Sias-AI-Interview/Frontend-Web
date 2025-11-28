import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/hooks/useToken"; 


export default function ProtectedRoute({ children }) {
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

    if (loading) return <p>Loading...</p>;

    return isLoggedIn ? children : <Navigate to="/login" replace />;
}
