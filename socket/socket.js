// socket/socket.js

const users = {}; // userId -> socketId

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      users[userId] = socket.id;
      socket.userId = userId;
      console.log("User joined:", userId);
    });

    socket.on("sendMessage", ({ receiver, message }) => {
      const receiverSocket = users[receiver];

      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", message);
      }
    });
    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`Joined group ${groupId}`);
    });

    socket.on("sendGroupMessage", ({ groupId, message }) => {
      io.to(groupId).emit("receiveGroupMessage", message);
    });

    socket.on("callUser", ({ to, offer }) => {
      const receiverSocket = users[to];
      if (receiverSocket) {
        io.to(receiverSocket).emit("incomingCall", { offer });
      }
    });

    socket.on("answerCall", ({ to, answer }) => {
      const receiverSocket = users[to];
      if (receiverSocket) {
        io.to(receiverSocket).emit("callAnswered", { answer });
      }
    });

    socket.on("iceCandidate", ({ to, candidate }) => {
      const receiverSocket = users[to];
      if (receiverSocket) {
        io.to(receiverSocket).emit("iceCandidate", { candidate });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      if (socket.userId) {
        delete users[socket.userId];
      }
    });
  });
};

export default socketHandler;