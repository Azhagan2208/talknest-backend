import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:userId", authMiddleware, getMessages);

export default router;
