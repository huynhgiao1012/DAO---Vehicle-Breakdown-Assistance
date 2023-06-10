require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Mongo = require("./config/db");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const EmailService = require("./utils/EmailService");
const catchError = require("./middleware/error");
const authRoutes = require("./route/authRoutes");
const companyRoutes = require("./route/companyRoutes");
const serviceRoutes = require("./route/serviceRoutes");
const userRoutes = require("./route/userRoutes");
app.use(express.json());
app.use(cors());
EmailService.init();
Mongo.connect();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/user", userRoutes);
app.use(catchError);
const port = process.env.PORT || 3000;

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });
  console.log(onlineUsers);
  socket.on("sendNotification", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      text,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
