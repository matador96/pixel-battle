const Controller = require("./controller");

module.exports = function (server) {
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
    usersConnected.add(id);
    io.emit("users-online", usersConnected.size);

    socket.on("disconnect", () => {
      usersConnected.delete(id);
      io.emit("users-online", usersConnected.size);
    });

    socket.on("try connect pixelgame", () => {
      console.log("connect");
      io.emit("connect pixelgame", Controller.getPixels());
    });

    socket.on("try patch pixelgame", (newPixel) => {
      console.log("patch");
      io.emit(
        "patch pixelgame",
        Controller.updatePixel(newPixel.x, newPixel.y, newPixel.color)
      );
    });
  });
};
