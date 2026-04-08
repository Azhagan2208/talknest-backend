import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import User from "../models/Users.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const users = await User.find({
    _id: { $ne: req.user.id },
  });
  res.json(users);
});

export default router;
