# 🌡️ Temperature & Humidity IoT Monitoring Dashboard

Real-time sensor data visualisation using **MQTT**, **Node.js**, **Socket.IO**, and **React**.

---

## 🚀 Project Overview

This project is an IoT-based real-time monitoring system that displays **temperature** and **humidity** data on a modern dashboard UI.

It simulates an IoT device using an MQTT publisher, sends data to a backend server, and updates the frontend using **WebSockets**.

Perfect project for learning:

- MQTT Messaging  
- IoT Architecture  
- Node.js Backend APIs  
- React Realtime UI  
- WebSockets  
- Sensor Data Simulation  

---

## 🏗️ Architecture

MQTT Sensor (simulator)  
        ↓  
MQTT Broker (Mosquitto)  
        ↓  
Node.js Backend (subscriber)  
        ↓  
WebSocket (Socket.IO)  
        ↓  
React Frontend (UI dashboard)

---

## ✨ Features

### 🔹 IoT Features
- Real-time temperature & humidity updates  
- Automatic data streaming via MQTT  
- Device-simulated sensor values  
- Backend logs every message  
- WebSocket live updates to UI  

### 🔹 Frontend Features
- Clean, modern **React + Vite** dashboard  
- Live temperature & humidity cards 
- Connection status indicator (“**Waiting for live sensor data…**”)  

### 🔹 Backend Features
- Node.js + Express server  
- MQTT subscriber  
- Socket.IO WebSocket gateway  
- Broadcasts sensor data to all connected clients  

---

## 📦 Project Structure

```
 smart-sensor-dashboard
   ├── backend — Node.js MQTT subscriber + WebSocket server
   ├── frontend — React dashboard UI
   └── sensor-simulator — MQTT publisher (fake temperature/humidity)

```
---

## 🧠 Technologies Used

### 🔹 Frontend
- React (Vite)

### 🔹 Backend
- Node.js
- Express
- MQTT
- Socket.IO

### 🔹 IoT
- MQTT Protocol
- Mosquitto Broker

---

## ⚙️ Backend Setup

### 1️⃣ Install dependencies
```
cd backend
npm install
```
### 2️⃣ Start backend server
```
npm run dev
```
Backend will run at:
👉 http://localhost:5000

📡 MQTT Setup
Install Mosquitto Broker
Linux
```
sudo apt install mosquitto mosquitto-clients
sudo systemctl start mosquitto
```
🚀 Run Sensor Simulator (Optional)

Install MQTT library (only first time)
```
cd sensor-simulator
npm install 
```
Start simulator
```
node publisher.js
```
🖥 Frontend Setup

### 1️⃣ Install dependencies
```
cd frontend
npm install
```
### 2️⃣ Start frontend
```
npm run dev
```
Frontend will run at:
👉 http://localhost:5173

---

## ✨ Future Enhancements
- Store sensor data in MongoDB
- Historical graph visualization
- Sensor offline/online alerts
- Multi-device support
- Email/SMS alerts
- User authentication page
