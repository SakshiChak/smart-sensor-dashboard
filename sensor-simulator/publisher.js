const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Sensor connected… publishing data");

  setInterval(() => {
    const data = {
      temperature: (20 + Math.random() * 10).toFixed(1),
      humidity: (40 + Math.random() * 20).toFixed(1),
      timestamp: new Date()
    };

    client.publish("sensor/room1", JSON.stringify(data));
    console.log("Published:", data);
  }, 2000);
});
