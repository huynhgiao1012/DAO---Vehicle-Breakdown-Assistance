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
const notiRoutes = require("./route/notiRoutes");
const formRoutes = require("./route/formRoutes");
app.use(express.json());
app.use(cors());
EmailService.init();
Mongo.connect();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/notification", notiRoutes);
app.use("/api/v1/notification", notiRoutes);
app.use("/api/v1/form", formRoutes);
app.use(catchError);
const port = process.env.PORT || 3000;

let onlineUsers = [];

const addNewUser = async (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id);
  });
  socket.on("sendNotification", ({ senderName, receiverName, text }) => {
    console.log(receiverName);
    // const receiver = getUser(receiverName);
    // if (!receiver) {
    const intervalId = setInterval(() => {
      const receiver = getUser(receiverName);
      console.log(receiver);
      if (receiver) {
        io.to(receiver.socketId).emit("getNotification", {
          senderName,
          receiverName,
          text,
        });
        clearInterval(intervalId);
      }
    }, 3000);

    // } else if (receiver) {
    //   console.log("Receiver", receiver);
    //   setTimeout(() => {
    //     io.to(receiver.socketId).emit("getNotification", {
    //       senderName,
    //       text,
    //     });
    //   }, 1000);
    // }
  });

  // socket.on("sendText", ({ senderName, receiverName, text }) => {
  //   const receiver = getUser(receiverName);
  //   io.to(receiver.socketId).emit("getText", {
  //     senderName,
  //     text,
  //   });
  // });

  socket.on("disconnectUser", () => {
    removeUser(socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
