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
const notification = require("./models/notification");
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

const addNewUser = async (userId, socketId) => {
  const data = await notification.findOne({ accountId: userId });
  if (data) {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = async (userId) => {
  const data = await notification.findOne({ accountId: userId });
  if (data) {
    const user = onlineUsers.find((user) => user.userId === userId);
    if (user) {
      return user;
    }
  }
};
io.on("connection", (socket) => {
  socket.emit("connected");
  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id);
  });
  console.log(onlineUsers);
  socket.on("sendNotification", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    console.log("receiver", receiver);
    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        text,
      });
    }
  });

  // socket.on("sendText", ({ senderName, receiverName, text }) => {
  //   const receiver = getUser(receiverName);
  //   io.to(receiver.socketId).emit("getText", {
  //     senderName,
  //     text,
  //   });
  // });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
