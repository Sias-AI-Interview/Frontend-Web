import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/libs/axios";
import { useProfileStore } from "@/store/useProfileStore";
import { toast } from "sonner";

export function useProfileQuery() {
    const setUser = useProfileStore((s) => s.setUser);

    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosInstance.get("/user/me");
            setUser(res.data.data);
            return res.data.data;
        },
        refetchOnWindowFocus: false,
    });
}

export function useUpdateProfile() {
    const updateUser = useProfileStore((s) => s.updateUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            try {
                const res = await axiosInstance.put("/user/update-profile", payload);
                // kembalikan seluruh res.data supaya bisa akses message & data
                return res.data;
            } catch (err) {
                console.error("Update profile error:", err.response?.data || err);
                throw err;
            }
        },
        onSuccess: (res) => {
            updateUser(res.data);
            queryClient.invalidateQueries(["profile"]);

            toast.success(res.message || "Profile berhasil diperbarui!");
        },
        onError: (err) => {
            const errorMessage = err.response?.data?.error || "Gagal memperbarui profile.";
            toast.error(errorMessage);
        },
    });
}
