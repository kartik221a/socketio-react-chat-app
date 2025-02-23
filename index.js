// Import packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

// Load environment variables
dotenv.config();

// Import files
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./database/connectDB.js";

// Main variables
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.options("*", cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// Standard Routes
app.get("/", (req, res) => {
  res.send(
    "Socket.io React Chat Application API. Use /api/auth/signup to get started."
  );
});

// Connect Database
connectDB();

// Serverless function handler
export const handler = serverless(app);

// Local development server
if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Local server running on port ${port}`));
}
