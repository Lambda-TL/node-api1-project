const express = require("express");
const server = express();
const cors = require("cors");

const usersRouter = require("./users/userRoutes");

server.use(express.json());
server.use(cors());

server.use("/api/users/", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ server: "working" });
});

module.exports = server;
