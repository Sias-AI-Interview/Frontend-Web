import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    token: localStorage.getItem("access_token") || null,
    user: JSON.parse(localStorage.getItem("user") || "null"),

    setToken: (token) => {
        localStorage.setItem("access_token", token);
        set({ token });
    },

    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },

    logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        set({ token: null, user: null });
    }
}));
