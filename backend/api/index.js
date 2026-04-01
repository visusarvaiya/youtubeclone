import connectDB from "../src/db/index.js";
import { app } from "../src/app.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to DB (Vercel caches the connection between requests in the same instance)
let cachedDb = null;

const handler = async (req, res) => {
    // Add basic CORS headers for the error response just in case
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (!cachedDb) {
        try {
            await connectDB();
            cachedDb = true;
        } catch (error) {
            console.error("DB connection error:", error);
            return res.status(500).json({ message: "Internal Server Error during DB connection" });
        }
    }
    return app(req, res);
};

export default handler;
