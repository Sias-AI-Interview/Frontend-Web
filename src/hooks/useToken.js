/**
 * Ambil session token dari localStorage atau cookie
 * @returns {object|null} session object atau null kalau tidak ada
 */
export function getAuthToken() {
    const tokenLS = localStorage.getItem("sb-ewwozsikohikpbawgjuv-auth-token");
    if (tokenLS) {
        try {
            return JSON.parse(tokenLS);
        } catch (err) {
            console.error("Failed to parse token from localStorage", err);
            localStorage.removeItem("sb-ewwozsikohikpbawgjuv-auth-token");
        }
    }

    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sb-ewwozsikohikpbawgjuv-auth-token="));
    if (cookie) {
        try {
            const tokenCookie = decodeURIComponent(cookie.split("=")[1]);
            localStorage.setItem(
                "sb-ewwozsikohikpbawgjuv-auth-token",
                tokenCookie
            );
            return JSON.parse(tokenCookie);
        } catch (err) {
            console.error("Failed to parse token from cookie", err);
        }
    }

    return null;
}
