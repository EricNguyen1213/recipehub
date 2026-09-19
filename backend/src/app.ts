import express, {type Express} from "express";
import morgan from "morgan";
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";
import { env } from "./lib/utils.ts";


export default function createApp(): Express {
    const app = express();

    app.use(cors({
        origin: env.FRONTEND_URL, // Allow only your frontend
        credentials: true,               // Required for Better Auth cookies to work
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.use(morgan("dev"));

    app.all('/api/auth/{*any}', toNodeHandler(auth));
    
    app.use(express.json());

    app.get("/api/", (req, res) => {
        res.status(200).json({message: "hello world"});
    });
    
    return app;
}