import Messages from "../models/Messages.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, receiver } = req.body;
    const message = await Messages.create({
      sender: req.user.id,
      receiver,
      text,
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
