// Import packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

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
    origin: process.env.FRONTEND_ORIGIN, // Allow only your frontend domain
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true, // Allow cookies if needed
  })
);
app.use(cookieParser());
app.use(express.json()); // To parse the incoming requests with JSON payloads
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

// Export for Vercel
export default app;

// Vercel needs this for serverless functions
if (process.env.NODE_ENV !== "vercel") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
