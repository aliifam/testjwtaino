import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Test the database connection
try {
    await db.authenticate();
    console.log("Database connection successful.");
} catch (error) {
    console.error("Database connection failed:", error);
}

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Listening on port 5000"));
