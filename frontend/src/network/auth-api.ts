import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import * as z from "zod/v4";
import { en } from "zod/v4/locales";


z.config(en());


export const signUpSchema = z.object({
    name: z.string().min(1),
    email: z.email().min(1),
    password: z.string().min(6),
});

export type SignUpForm = z.infer<typeof signUpSchema>;

export function handleSignUpStub(openEmailVerificationTab: (email: string) => void) {
    const handleSignUp = async (data: SignUpForm) => {
        const res = await authClient.signUp.email(
            { ...data, callbackURL: "/" },
            {
                onError: error => {
                    toast.error(error.error.message || "Failed to sign up")
                }
            }
        );

        if (res.error == null && !res.data.user.emailVerified) {
            openEmailVerificationTab(data.email);
        }
    };
    return handleSignUp;
}


export const signInSchema = z.object({
    email: z.email().min(1),
    password: z.string().min(6),
});

export type SignInForm = z.infer<typeof signInSchema>;

export function handleSignInStub(openEmailVerificationTab: (email: string) => void) {
    const handleSignIn = async (data: SignInForm) => {
        await authClient.signIn.email(
            { ...data },
            {
                onSuccess: () => {
                    window.location.href = "/";
                },
                onError: error => {
                    if (error.error.code === "EMAIL_NOT_VERIFIED") {
                        openEmailVerificationTab(data.email);
                    }
                    toast.error(error.error.message || "Failed to sign in");
                }
            }
        )
    }
    return handleSignIn;
}
