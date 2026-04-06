import Messages from "../models/Messages.js";
import cloudinary from "../config/cloudinary.js";

export const sendGroupMessage = async (req, res) => {
  const { text, groupId, image } = req.body;
  let imageUrl = "";
  if (image) {
    const result = await cloudinary.uploader.upload(image, {
      folder: "group_messages",
    });
    imageUrl = result.secure_url;
  }
  const message = await Messages.create({
    sender: req.user.id,
    group: groupId,
    text,
    image: imageUrl,
  });
  res.json(message);
};

export const getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  const messages = await Messages.find({ group: groupId }).populate(
    "sender",
    "username profilePic",
  );
  res.json(messages);
};
