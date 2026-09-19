import createApp from "./app.ts";
import { env } from "./lib/utils.ts";


const port = env.PORT;

try {
    const app = createApp();

    app.listen(port, () => {
        console.log("Server running on port: " + port);
    });

} catch (error) {
    console.error("Failed to start server: ", error);
}