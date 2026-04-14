import env from "./utils/validation.ts"
import { initDB } from "./db.ts";
import { initAuth } from "./utils/auth.ts";
import createApp from "./app.ts";

const port = env.PORT;

try {
    const [db, client] = await initDB(env.MONGO_CONNECTION_STRING);
    const auth = initAuth(db, client);
    const app = createApp(auth);

    app.listen(port, () => {
        console.log("Server running on port: " + port);
    });

} catch (error) {
    console.error("Failed to start server: ", error);
}