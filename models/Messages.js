import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: String,
    image: String,
  },
  { timestamps: true },
);

export default mongoose.model("Message", messageSchema);
