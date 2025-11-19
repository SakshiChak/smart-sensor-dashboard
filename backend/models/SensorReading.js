const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  timestamp: Date
});

module.exports = mongoose.model("SensorReading", sensorSchema);
