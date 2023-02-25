module.exports = function (server) {
  console.log("okkk");
  const io = require("socket.io")(server, {
    cors: {
      // origin: "https://127.0.0.1:3003",
      methods: ["GET"],
      credentials: true,
    },
  });

  const usersConnected = new Set();

  io.on("connection", (socket) => {
    const { id } = socket.client;
    // , [socket.client.id, socket.id]
    usersConnected.add(id);
    io.emit("users-online", usersConnected.size);

    socket.on("disconnect", () => {
      usersConnected.delete(id);
      io.emit("users-online", usersConnected.size);
    });
  });
};
