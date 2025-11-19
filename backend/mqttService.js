const mqtt = require("mqtt");
const config = require("./config");
const Sensor = require("./models/SensorReading");
const { emitToClients } = require("./websocket");

function startMQTT() {
  const client = mqtt.connect(config.mqtt.url);

  client.on("connect", () => {
    console.log("MQTT Connected");
    client.subscribe(config.mqtt.topic);
  });

  client.on("message", async (topic, message) => {
    const data = JSON.parse(message.toString());
    console.log("Received:", data);

    // Save to DB
    await Sensor.create(data);

    // Send to frontend (live)
    emitToClients(data);
  });
}

module.exports = startMQTT;
