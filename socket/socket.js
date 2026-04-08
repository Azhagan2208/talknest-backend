const users = {}; // userId -> socketId

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // join user
    socket.on("join", (userId) => {
      users[userId] = socket.id;
      socket.userId = userId;

      console.log("User joined:", userId);
      console.log("USERS:", users);
    });

    // send message
    socket.on("sendMessage", ({ receiver, message }) => {
      const receiverSocket = users[receiver];

      console.log("➡ Sending to:", receiver);
      console.log("USERS:", users);

      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", message);
      } else {
        console.log("Receiver not connected");
      }
    });

    // disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      if (socket.userId) {
        delete users[socket.userId];
      }
    });
  });
};

export default socketHandler;