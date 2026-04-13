const users = {}; // userId -> socketId

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    // join user
    socket.on("join", (userId) => {
      users[userId] = socket.id;
      console.log(userId);
      socket.userId = userId;
    });

    // send message
    socket.on("sendMessage", ({ receiver, message }) => {
      const receiverSocket = users[receiver];

      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", message);
      } else {
        console.log("Receiver not connected");
      }
    });

    // disconnect
    socket.on("disconnect", () => {
      if (socket.userId) {
        delete users[socket.userId];
      }
    });
  });
};

export default socketHandler;
