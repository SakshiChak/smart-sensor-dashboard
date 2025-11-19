let clients = [];

function initWebSocket(server) {
  const { Server } = require("socket.io");
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    clients.push(socket);
    console.log("Client connected");

    socket.on("disconnect", () => {
      clients = clients.filter(c => c !== socket);
    });
  });
}

function emitToClients(data) {
  clients.forEach(client => client.emit("sensor-data", data));
}

module.exports = { initWebSocket, emitToClients };
