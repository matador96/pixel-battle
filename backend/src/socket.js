const Controller = require("./controller");

const coolDownInMillis = 2 * 1000;

module.exports = function (server) {
  const io = require("socket.io")(server, {
    cors: {
      // origin: "https://127.0.0.1:3003",
      methods: ["GET"],
      credentials: true,
    },
  });

  const usersConnected = new Set();
  const coolDownUsers = new Object();

  io.on("connection", (socket) => {
    const { id } = socket.client;
    usersConnected.add(id);
    io.emit("users-online", usersConnected.size);

    socket.on("disconnect", () => {
      usersConnected.delete(id);

      if (coolDownUsers[id]) {
        delete coolDownUsers[id];
      }

      io.emit("users-online", usersConnected.size);
    });

    socket.on("try connect pixelgame", () => {
      const timestampMillis = Date.now();
      socket.emit("connect pixelgame", Controller.getPixels());
    });

    socket.on("try patch pixelgame", (newPixel) => {
      const timestampMillis = Date.now();
      const differenceTime = timestampMillis - coolDownUsers[id];

      if (differenceTime < coolDownInMillis) {
        const timeToLeft = Math.ceil(
          (coolDownInMillis - differenceTime) / 1000
        );

        socket.emit("cooldown pixelgame", timeToLeft);
        return;
      }

      coolDownUsers[id] = timestampMillis;

      io.emit(
        "patch pixelgame",
        Controller.updatePixel(newPixel.x, newPixel.y, newPixel.color)
      );
    });
  });
};
