const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const config = require("./config");
const startMQTT = require("./mqttService"); 
const { initWebSocket } = require("./websocket"); 

// ----------------------
// Express + Server Setup
// ----------------------
const app = express();
app.use(cors({origin: process.env.ALLOWED_ORIGINS })); // CORS setup
const server = http.createServer(app);

// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect(config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// ----------------------
// Socket.IO Setup
// ----------------------
initWebSocket(server); // initialize Socket.IO

// ----------------------
// Start MQTT Service
// ----------------------
startMQTT(); // MQTT runs independently and emits to clients

// ----------------------
// Start Server
// ----------------------
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
