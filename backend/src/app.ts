import express, {type Express} from "express";
import cors from 'cors';
import type { Auth } from "./utils/auth.ts";
import { toNodeHandler } from "better-auth/node";
import morgan from "morgan";

function createApp(auth : Auth): Express {
    const app = express();

    app.use(cors({
        origin: "http://localhost:5173", // Allow only your frontend
        credentials: true,               // Required for Better Auth cookies to work
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.all('/api/auth/{*any}', toNodeHandler(auth));

    app.use(morgan("dev"));

    app.use(express.json());

    app.get("/api/", (req, res, next) => {
        res.status(200).json({message: "hello world"});
    });

    return app;
}

export default createApp;
