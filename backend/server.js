const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config(); //calling the .env file and loading the environment variables
connectDB();

const app = express(); //instance of express

app.use(express.json()); //to accept JSON data

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/user", userRoutes); // Abstracting routes logic in userRoutes
app.use("/api/chat", chatRoutes); // Abstracting routes logic in chatRoutes

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000; //So that the port number is not public we add it to .env

app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold)); //Listening on PORT
