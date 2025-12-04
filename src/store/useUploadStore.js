import { create } from "zustand"

export const useUploadStore = create((set) => ({
    files: [],
    analysisResult: null,
    loading: false,

    setFiles: (payload) =>
        set((state) => ({
            files: typeof payload === "function" ? payload(state.files) : payload,
        })),

    clearFiles: () =>
        set({
            files: [],
            analysisResult: null,
            loading: false,
        }),

    setAnalysisResult: (result) => set({ analysisResult: result }),
    setLoading: (value) => set({ loading: value }),
}))
