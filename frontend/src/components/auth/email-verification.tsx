import { useRef, useState } from "react";
import { BetterAuthActionButton } from "./auth-action-button";
import { authClient } from "@/lib/auth-client";


export function EmailVerification({ email }: { email: string }) {
    const interval = useRef<number | undefined>(undefined);
    const [timeToNextResend, setTimeToNextResend] = useState(30);

    const startCountdown = (time = 30) => {
        setTimeToNextResend(time);
        interval.current = setInterval(() => {
            setTimeToNextResend(t => {
                const newT = t - 1;
                if (newT <= 0) {
                    clearInterval(interval.current);
                    return 0;
                }
                return newT
            });
        }, 1000);
    };

    return (
        <div className="space-y-4 w-full h-full">
            <p className="mt-2 text-mydarkgreen">
                We sent you a verification link. Please check your email and click the link to verify your account.
            </p>

            <BetterAuthActionButton 
                variant="outline"
                className="w-full text-mydarkgreen text-base border-2"
                successMessage="Verification email sent!"
                action={() => {
                    startCountdown();
                    return authClient.sendVerificationEmail({ email, callbackURL: "/" })
                }}
            >
                {timeToNextResend > 0 
                    ? `Resend Email (${timeToNextResend})` 
                    : "Resend Email"}
            </BetterAuthActionButton>
        </div>
    )
}