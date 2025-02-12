import express from "express";
import {
  sendMessage,
  receiveMessage,
} from "../controllers/message.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.post("/receive/:id", receiveMessage);

export default router;
