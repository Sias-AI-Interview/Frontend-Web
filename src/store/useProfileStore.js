import { create } from "zustand";

export const useProfileStore = create((set) => ({
    user: null,

    setUser: (user) => {
        localStorage.setItem("app-profile", JSON.stringify(user));
        set({ user });
    },

    updateUser: (data) =>
        set((state) => {
            const newUser = { ...state.user, ...data };
            localStorage.setItem("app-profile", JSON.stringify(newUser));
            return { user: newUser };
        }),
}));

// export function useProfile() {
//     const setUser = useProfileStore((s) => s.setUser);
//     const user = useProfileStore((s) => s.user);

//     useEffect(() => {
//         const raw = localStorage.getItem("sb-ewwozsikohikpbawgjuv-auth-token");
//         if (!raw) return;

//         try {
//             const parsed = JSON.parse(raw);
//             setUser(parsed.user);
//         } catch (e) {
//             console.error("Invalid token", e);
//         }
//     }, [setUser]);

//     return user;
// }


