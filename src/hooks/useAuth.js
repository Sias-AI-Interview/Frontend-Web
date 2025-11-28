import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../libs/axios";

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

