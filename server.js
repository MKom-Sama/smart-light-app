const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8060;

// Socket Server
const socketIo = require("socket.io");

const server = app.listen(PORT, console.log(`Listening to PORT:${PORT}`));

// MIDDLEWARE
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/*", (req, res) => {
    const index = path.join(__dirname, "client", "build", "index.html");
    res.sendFile(index);
  });
}

const io = socketIo(server);

io.on("connection", (socket) => {

  socket.on("bulb-clicked", ({ user, name, game }) => {
    // sends to mqtt 
  });

});