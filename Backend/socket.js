const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected  : ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, Type } = data;

      console.log(`user ${userId} joind as ${Type}`);

      if (Type == "user") {
        await userModel.findByIdAndUpdate(userId, { SocketId: socket.id });
      } else if (Type == "captain") {
        await captainModel.findByIdAndUpdate(userId, { SocketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected  : ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log(
    `messgae is sent to : ${socketId}, message ${messageObject.data}`
  );

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log(`${socketId} not found socket id`);
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
