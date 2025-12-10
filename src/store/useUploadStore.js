import { create } from "zustand"
import axiosInstance from "@/libs/axios"

export const useUploadStore = create((set, get) => ({
    files: [],
    analysisResult: null,
    loading: false,
    payloads: [],
    payloadLoading: false,

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

    fetchPayloads: async () => {
        try {
            set({ payloadLoading: true })

            const res = await axiosInstance.get("/payload/get")

            set({
                payloads: res.data?.data || [],
                payloadLoading: false,
            })
        } catch (err) {
            set({ payloadLoading: false })
        }
    },

    fetchPayloadDetail: async (id) => {
        try {
            set({ payloadDetailLoading: true })

            const res = await axiosInstance.get(`/payload/get/${id}`)

            set({
                payloadDetail: res.data?.data || null,
                payloadDetailLoading: false,
            })

            console.log("Payload Detail:", res.data?.data)
        } catch (err) {
            set({
                payloadDetail: null,
                payloadDetailLoading: false,
            })
            console.error(err)
        }
    },
    deletePayload: async (id) => {
        try {
            await axiosInstance.delete(`/payload/delete/${id}`)

            set({
                payloads: get().payloads.filter((item) => item.id !== id),
            })
        } catch (err) {
            console.error(err)
        }
    },
}))
