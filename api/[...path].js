export const config = { runtime: "nodejs", maxDuration: 300 };

export default async function handler(req, res) {
    const { path = [] } = req.query;

    const base = process.env.VITE_API_ENDPOINT_URL; 
    if (!base) return res.status(500).json({ error: "Missing env VITE_API_ENDPOINT_URL" });

    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(req.query || {})) {
        if (k === "path") continue;
        if (Array.isArray(v)) v.forEach((vv) => qs.append(k, String(vv)));
        else if (v != null) qs.append(k, String(v));
    }

    const url =
        `${base.replace(/\/$/, "")}/api/${path.map(encodeURIComponent).join("/")}` +
        (qs.toString() ? `?${qs.toString()}` : "");

    // timeout 5 menit
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 300000);

    try {
        const upstream = await fetch(url, {
            method: req.method,
            headers: {
                ...(req.headers["authorization"] ? { authorization: req.headers["authorization"] } : {}),
                ...(req.headers["x-user-id"] ? { "x-user-id": req.headers["x-user-id"] } : {}),
                ...(req.headers["content-type"] ? { "content-type": req.headers["content-type"] } : {}),
            },
            body: ["GET", "HEAD"].includes(req.method) ? undefined : JSON.stringify(req.body ?? {}),
            signal: controller.signal,
        });

        res.status(upstream.status);

        const ct = upstream.headers.get("content-type");
        if (ct) res.setHeader("content-type", ct);

        const buf = Buffer.from(await upstream.arrayBuffer());
        return res.send(buf);
    } catch (e) {
        if (e?.name === "AbortError") return res.status(504).json({ error: "Upstream timeout (5m)" });
        return res.status(502).json({ error: "Bad gateway", detail: String(e) });
    } finally {
        clearTimeout(t);
    }
}
