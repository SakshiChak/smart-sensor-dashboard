const mqtt = require("mqtt");
const config = require("./config");
const Sensor = require("./models/SensorReading");
const { emitToClients } = require("./websocket");

function startMQTT() {
  const client = mqtt.connect(config.mqtt.url);

  client.on("connect", () => {
    console.log("MQTT Connected");
    client.subscribe(config.mqtt.topic, (err) => {
      if (err) console.error("MQTT subscription error:", err);
      else console.log(`Subscribed to topic: ${config.mqtt.topic}`);
    });
  });

  client.on("message", async (topic, message) => {
    let data;

    // Safe JSON parsing
    try {
      data = JSON.parse(message.toString());
    } catch (err) {
      return console.error("Invalid JSON received:", err);
    }

    // Add timestamp
    if (!data.timestamp) data.timestamp = new Date();

    // Save to DB
    try {
      const saved = await Sensor.create(data);
      console.log("Saved to DB:", saved);
    } catch (err) {
      console.error("DB save error:", err);
    }

    // Send to frontend
    emitToClients(data);
    console.log("Sent to frontend:", data);
  });
}

module.exports = startMQTT;
