import express from "express";
import { createGroup, getUserGroups } from "../controllers/groupController.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, createGroup);
router.get("/", authMiddleware, getUserGroups);

export default router;
