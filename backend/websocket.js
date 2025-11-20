const { Server } = require("socket.io");

let clients = [];

function initWebSocket(server) {
  const io = new Server(server, {
    cors: { origin: process.env.ALLOWED_ORIGINS  }
  });

  io.on("connection", (socket) => {
    console.log("Frontend connected:", socket.id);
    clients.push(socket);

    socket.on("disconnect", () => {
      clients = clients.filter(c => c !== socket);
      console.log("Frontend disconnected:", socket.id);
    });
  });
}

function emitToClients(data) {
  clients.forEach(socket => socket.emit("sensor-data", JSON.stringify({
    ...data,
    timestamp: Date.now()
  })));
}

module.exports = { initWebSocket, emitToClients };
