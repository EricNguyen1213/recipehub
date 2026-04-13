import morgan from "morgan";
import env from "./utils/validation.ts"
import express from "express";
import mongoose from "mongoose";

const port = env.PORT;

try {
    const app = express();
    app.use(morgan("dev"));
    app.use(express.json());

    await mongoose.connect(env.MONGO_CONNECTION_STRING);
    console.log("Mongoose connected");

    app.listen(port, () => {
        console.log("Server running on port: " + port);
    });

} catch (error) {
    console.error("Failed to start server: ", error);
}