import mongoose from "mongoose";
import { env } from "./lib/utils.ts";

try {
    mongoose.connection.on('connected', () => console.log("✅ MongoDB connected"));
    mongoose.connection.on("error", (err) => console.error("❌ MongoDB connection error:", err));
    mongoose.connection.on("disconnected", () => console.warn("⚠️ MongoDB disconnected"));
    await mongoose.connect(env.MONGO_CONNECTION_STRING);
    if (!mongoose.connection.db) {
        throw new Error("Database connection not established or 'db' object is missing.");
    }
    if (!mongoose.connection.getClient()) {
        throw new Error("Database connection not established or 'client' object is missing.");
    }
    await mongoose.connection.db?.command({ ping: 1 });

} catch (error) {
    console.error("💥 Failed to initialize database:", error);
    throw error;
}

export const db = mongoose.connection.db;
export const client = mongoose.connection.getClient();
