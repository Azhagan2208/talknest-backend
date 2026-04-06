import cloudinary from "../config/cloudinary.js";
import Messages from "../models/Messages.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, receiver, image } = req.body;
    let imageUrl = "";
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "messages",
      });
      imageUrl = result.secure_url;
    }
    const message = await Messages.create({
      sender: req.user.id,
      receiver,
      text,
      image: imageUrl,
    });
    res.json(message);
  } catch (error) {
    res.status(500).json("Send Message Error");
  }
};

export const getMessages = async (req, res) => {
  const { userId } = req.params;

  const messages = await Messages.find({
    $or: [
      { sender: req.user.id, receiver: userId },
      { sender: userId, receiver: req.user.id },
    ],
  });
  res.json(messages);
};
