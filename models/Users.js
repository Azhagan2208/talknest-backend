import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    tagline: String,
    email: String,
    password: String,
    profilePic: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
