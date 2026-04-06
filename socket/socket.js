const users = {};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      users[userId] = socket.id;
    });
    socket.on("sendMessage", ({ receiver, messgae }) => {
      if (users[receiver]) {
        io.to(users[receiver].emit("receiveMessage", message));
      }
    });
    socket.on("callUser", ({ to, offer }) => {
      io.to(users[to]).emit("incomingCall", { offer });
    });
    socket.on("answerCall", ({ to, answer }) => {
      io.to(users[to]).emit("callAnswered", { answer });
    });
    socket.on("iceCandidate", ({ to, candidate }) => {
      io.to(users[to]).emit("iceCandidate", { candidate });
    });
  });
};

export default socketHandler;
