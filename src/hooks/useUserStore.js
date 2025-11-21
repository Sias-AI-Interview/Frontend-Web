import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiLogin, apiGetUser } from '../servers/userApi';

export const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            loading: false,
            error: null,

            login: async (credentials) => {
                set({ loading: true, error: null });
                try {
                    const res = await apiLogin(credentials);
                    set({ user: res.user, token: res.token, loading: false });
                } catch (err) {
                    set({ error: err.message || 'Login failed', loading: false });
                }
            },

            fetchUser: async () => {
                const token = get().token;
                if (!token) return;
                set({ loading: true });
                try {
                    const userData = await apiGetUser(token);
                    set({ user: userData, loading: false });
                } catch (err) {
                    set({ error: err.message, loading: false });
                }
            },

            logout: () => set({ user: null, token: null })
        }),
        {
            name: 'user_storage'
        }
    )
);
