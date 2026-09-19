import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "../db.ts";
import { sendEmailVerificationEmail } from "./send-email.ts";
import { env } from "./utils.ts";


export const auth = betterAuth({
    database: mongodbAdapter(db, { client: client }),
    trustedOrigins: [env.FRONTEND_URL],
    emailAndPassword: {
        enabled: true,
        requireEmailVerfication: true,
        
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendEmailVerificationEmail({ user, url });
        }
    },
    // hooks: {
    //     after: createAuthMiddleware( async (ctx) => {
    //         // if (ctx.path === "/sign-in/email" ) {
    //         //     const user = ctx.context.newSession?.user;
    //         //     if (user && !user.emailVerified) throw new APIError("FORBIDDEN", { code: "EMAIL_NOT_VERIFIED", message: "Please verify your email address before logging in." });
    //         // }
    //         return ctx;
    //     }),
    // }
});

