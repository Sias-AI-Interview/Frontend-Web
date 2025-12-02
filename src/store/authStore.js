import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    token: null,
    setToken: (token) => set({ token }),
    logout: () => set({ token: null }),
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
