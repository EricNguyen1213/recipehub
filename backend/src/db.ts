import mongoose from "mongoose";
import type { Db, MongoClient } from "mongodb";

export async function initDB(key: string): Promise<[Db, MongoClient]> {
    try {
        mongoose.connection.on('connected', () => console.log("✅ MongoDB connected"));
        mongoose.connection.on("error", (err) => console.error("❌ MongoDB connection error:", err));
        mongoose.connection.on("disconnected", () => console.warn("⚠️ MongoDB disconnected"));
        await mongoose.connect(key);
        if (!mongoose.connection.db) {
            throw new Error("Database connection established but 'db' object is missing.");
        }
        return [mongoose.connection.db, mongoose.connection.getClient()];

    } catch (error) {
        console.error("💥 Failed to initialize database:", error);
        throw error;
    }
}

