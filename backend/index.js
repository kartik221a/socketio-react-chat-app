//import packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

//import files
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectDB from "./database/connectDB.js";

//main variables
const app = express();

//no need for uploading on vercel
const port = process.env.PORT || 3001;

//middlewares
//express middlewares

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN, // Allow only your frontend domain
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true, // Allow cookies if needed
  })
);
app.use(cookieParser());
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.options("*", cors());

// user defined middlewares
app.use("/api/auth", authRoutes); //middleware for authentication routes
app.use("/api/message", messageRoutes); //middleware for message routes
app.use("/api/users", userRoutes);

//standard routes
app.get("/", (req, res) => {
  res.send(
    "Socketio react chat application begins from this api route, proceed to other routes to access the api\nfor example\n\tapi/auth/signup"
  );
});

connectDB();
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
