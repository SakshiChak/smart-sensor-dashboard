const { mongo } = require('mongoose');

require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  apiVersion: process.env.API_VERSION || 'v1',
  
  mqtt: {
    brokerUrl: MQTT_BROKER_URL||"mqtt://localhost:1883",
    topic: "sensor/room1"
  },
  
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/smartDashboard"
  },
};
