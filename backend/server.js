const express = require("express");
const http = require("http");
const cors = require("cors");
const mqtt = require("mqtt");

const app = express();
app.use(cors());

const server = http.createServer(app);

// ----------------------
// SOCKET.IO SETUP
// ----------------------
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Frontend connected:", socket.id);
});

// ----------------------
// MQTT SETUP
// ----------------------
const mqttClient = mqtt.connect("mqtt://localhost:1883");

mqttClient.on("connect", () => {
  console.log("MQTT connected");

  mqttClient.subscribe("sensor/room1", (err) => {
    if (!err) console.log("Subscribed to sensor/room1");
  });
});

// Receive → forward to frontend
mqttClient.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());

  // EMIT EXACT EVENT NAME
  io.emit(
  "sensor-data",
  JSON.stringify({
    ...data,
    timestamp: Date.now()   // always fresh → UI updates
  })
);


  console.log("Forwarded to frontend:", data);
});

// ----------------------
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
