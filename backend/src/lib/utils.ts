import { cleanEnv, port, str, email } from "envalid";

export const env = cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    RESEND_API_KEY: str(),
    RESEND_FROM_EMAIL: email(),
    FRONTEND_URL: str(),
})