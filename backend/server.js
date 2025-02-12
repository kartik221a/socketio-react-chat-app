//import packages
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

//import files
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectDB from "./database/connectDB.js";

//main variables
const app = express();
const port = process.env.PORT;

//middlewares
//express middlewares
app.use(cookieParser())
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)

// user defined middlewares
app.use("/api/auth", authRoutes); //middleware for authentication routes
app.use("/api/message", messageRoutes); //middleware for message routes

//standard routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//starting point
app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`);
});
