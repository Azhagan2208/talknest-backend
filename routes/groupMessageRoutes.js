import express from "express";
import {
  sendGroupMessage,
  getGroupMessages,
} from "../controllers/groupMessageController.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, sendGroupMessage);
router.get("/:groupId", authMiddleware, getGroupMessages);

export default router;
