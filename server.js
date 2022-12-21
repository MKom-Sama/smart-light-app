const express = require("express");
const mqtt = require("mqtt");
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

// mqtt configs
const host = process.env.HOST || "";
const port = process.env.SERVER_PORT || 6000;
const username = process.env.USERNAME || "";
const password = process.env.PASSWORD || "";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username,
  password,
  reconnectPeriod: 1000,
});

const topic = "sensors/ultrasonic";
client.on("connect", () => {
  console.log("Connected to MQTT SERVER");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
});

io.on("connection", (socket) => {
  socket.on("bulb-clicked", ({ on }) => {
    // sending to bulb
    client.publish(
      "bulb/clicked",
      on == 1 ? "1" : "0",
      { qos: 0, retain: false },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
  });

  // receiving from bulb
  client.on("message", (topic, payload) => {
    let val = payload.toString();
    console.log("Received Message:", topic, val);

    let on = val == "1" ? 1 : 0;
    io.sockets.emit("bulb", { on });
  });
});
