import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

export const register = async (req, res) => {
  try {
    const { username,tagline, email, password, profilePic } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("All Fields Required!!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      tagline,
      email,
      password: hashedPassword,
      profilePic
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Register error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json("User not Found!");
  }
  const validatePassword = bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res.status(400).json("Wrong Password");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({
    user,
    token,
  });
};
