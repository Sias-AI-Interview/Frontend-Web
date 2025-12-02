import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../libs/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/auth/register", data, {
                headers: { "Content-Type": "application/json" },
                validateStatus: () => true,
            });

            if (res.status >= 400) {
                throw new Error(res.data?.error || "Registration failed");
            }

            return res.data;
        },
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/auth/login", data, {
                headers: { "Content-Type": "application/json" },
                validateStatus: () => true,
            });

            if (res.status >= 400) {
                throw new Error(res.data?.error || "Login failed");
            }

            return res.data;
        },
    });
};


export function useAuthUser() {
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        const stored = localStorage.getItem("sb-ewwozsikohikpbawgjuv-auth-token");
        if (!stored) return;

        try {
            const parsed = JSON.parse(stored);
            setUser(parsed.user);
        } catch (err) {
            console.error("Failed to parse user token", err);
        }
    }, [setUser]);

    return useAuthStore((state) => state.user);
}