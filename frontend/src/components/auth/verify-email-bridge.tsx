import { authClient } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";

export default function VerifyEmailBridge() {
    const [status, setStatus] = useState("Initializing verification pipeline...");
    const hasTriggered = useRef(false);

    useEffect(() => {
        if (hasTriggered.current) return;
        hasTriggered.current = true;
        let isMounted = true; 

        const verifyAndClose = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (!token) {
                if (isMounted) setStatus("Verification failed: Missing or invalid token link.");
                return;
            }

            try {
                if (isMounted) setStatus("Verifying token with backend server...");
                const { error } = await authClient.verifyEmail({ query: { token } });
                
                if (error) {
                    setStatus(`Verification failed: ${error.message}`);
                    return;
                }
                setStatus("Email verified successfully! Closing window...");
                setTimeout(() => { window.close(); }, 1500);

            } catch {
                if (isMounted) setStatus("A network communication error occurred with the API backend.");
            }
        }

        verifyAndClose();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif", backgroundColor: "#f8f9fa" }}>
            <div style={{ textAlign: "center", padding: "32px", border: "1px solid #dee2e6", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <h2 style={{ color: "#28a745", margin: "0 0 12px 0" }}>RecipeHub</h2>
                <p style={{ fontSize: "16px", fontWeight: "500", color: "#495057" }}>{status}</p>
                <p style={{ fontSize: "12px", color: "#6c757d", marginTop: "16px" }}>If this tab doesn't close automatically, you can close it safely manually.</p>
            </div>
        </div>
    );
}