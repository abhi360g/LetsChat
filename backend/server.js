const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config(); //calling the .env file and loading the environment variables
connectDB();

const app = express(); //instance of express

app.use(express.json()); //to accept JSON data

// app.get("/", (req, res) => {
//   res.send("API is Running");
// });

app.use("/api/user", userRoutes); // Abstracting routes logic in userRoutes
app.use("/api/chat", chatRoutes); // Abstracting routes logic in chatRoutes
app.use("/api/message", messageRoutes);

//--------------------------------------Deployment----------------
//Current working directory
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}
//--------------------------------------Deployment----------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000; //So that the port number is not public we add it to .env

const server = app.listen(
  PORT,
  console.log(`Server started on PORT ${PORT}`.yellow.bold)
); //Listening on PORT

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    //To avoid cross origin errors we pass cors
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  //Each user should get his own socket
  socket.on("setup", (userData) => {
    //Create a new room with the Id of the userData
    //Creating a new socket where front end will send the data and join a room
    socket.join(userData._id); // Each room will be exclusive to a particular user
    // console.log(userData._id);
    socket.emit("connected");
  }); //Taking user data from the frontend

  socket.on("join chat", (room) => {
    //Clicking on a chat creates a new room
    socket.join(room); //Creates a room with our userId and when the other user opens this chat from his device he is added to this room
    console.log("User Joined Room " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
