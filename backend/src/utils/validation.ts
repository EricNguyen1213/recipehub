import { cleanEnv, port, str } from "envalid";

// Validate Env Variables
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
});