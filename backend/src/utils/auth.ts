import { betterAuth, type BetterAuthOptions } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import type { Db, MongoClient } from "mongodb";

export type Auth = ReturnType<typeof betterAuth>

export function initAuth(db: Db, client: MongoClient): Auth {
    const authConfig = {
        database: mongodbAdapter(db, {client}),
        emailAndPassword: {
            enabled: true,
        },
        trustedOrigins: ["http://localhost:5173"],
    } as BetterAuthOptions;

    return betterAuth(authConfig);
};
