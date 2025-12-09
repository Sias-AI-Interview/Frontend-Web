export function getAuthData() {
    const raw = localStorage.getItem("sb-ewwozsikohikpbawgjuv-auth-token");
    let userId = null;
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            userId = parsed?.user?.id ?? null;
        } catch (err) {
            console.warn("Gagal parse Supabase token:", err);
        }
    }
    return { userId };
}



// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function useSTTWebSocket({ payloadId, videoUrls, userId, onUpdate }) {
//     const WS_URL = import.meta.env.VITE_WS_URL;
//     const wsRef = useRef(null);
//     const keepAliveRef = useRef(null);
//     const [connected, setConnected] = useState(false);

//     useEffect(() => {
//         if (!payloadId || !videoUrls?.length) return;
//         if (wsRef.current) return;

//         const ws = new WebSocket(`${WS_URL}/ws/stt-dznt`);
//         wsRef.current = ws;

//         ws.onopen = () => {
//             console.log("✅ WS Connected");
//             setConnected(true);
//             ws.send(JSON.stringify({ payloadId, videoUrls, userId }));

//             keepAliveRef.current = setInterval(() => {
//                 if (ws.readyState === WebSocket.OPEN) {
//                     ws.send(JSON.stringify({ type: "ping" }));
//                 }
//             }, 30000);
//         };

//         ws.onmessage = (event) => {
//             try {
//                 const data = JSON.parse(event.data);
//                 if (data.type === "ping") return;
//                 onUpdate?.(data);
//             } catch (err) {
//                 console.error("⚠️ WS message error:", event.data, err);
//             }
//         };

//         ws.onerror = (err) => {
//             console.error("⚠️ WS Error:", err);
//             setConnected(false);
//         };

//         ws.onclose = () => {
//             console.log("❌ WS Closed");
//             setConnected(false);
//             if (keepAliveRef.current) clearInterval(keepAliveRef.current);
//         };

//         return () => {
//             if (keepAliveRef.current) clearInterval(keepAliveRef.current);
//             if (wsRef.current) wsRef.current.close();
//         };
//     }, [payloadId, videoUrls, userId]);

//     return connected;
// }


export function connectSTTFromPayload(payloadId, fullPayload) {
    const { userId } = getAuthData();
    const WS_URL = import.meta.env.VITE_WS_URL;
    if (!WS_URL) {
        console.error("❌ VITE_WS_URL is undefined! Check your .env file");
        return null;
    }

    const ws = new WebSocket(`${WS_URL}/ws/stt-dznt`);

    ws.onopen = () => {
        console.log("✅ WS Connected (STT FULL PAYLOAD)");

        ws.send(JSON.stringify({
            payload_id: payloadId,
            user_id: userId,
            data: fullPayload.data
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("🎯 STT STREAM:", data);

        if (data.stage === "saved") {
            console.log("✅ Saved to Supabase:", data.file_url);
        }
    };

    ws.onerror = (err) => {
        console.error("❌ WS Error:", err);
    };

    ws.onclose = () => {
        console.log("❌ WS Closed");
    };

    return ws;
}

export function connectAssessment(payloadId, text) {
    const { userId } = getAuthData();
    const WS_URL = `${import.meta.env.VITE_API_WS_URL || "ws://localhost:8000"}/ws/assessment`;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        console.log("✅ WS Connected (Assessment)");

        ws.send(JSON.stringify({
            payload_id: payloadId,
            user_id: userId,
            text: text
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("📊 ASSESSMENT RESULT:", data);

        if (data.stage === "saved") {
            console.log("✅ File saved:", data.file_url);
        }
    };

    ws.onerror = (err) => {
        console.error("❌ WS Error:", err);
    };

    ws.onclose = () => {
        console.log("❌ WS Closed");
    };

    return ws;
}
