import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [sensorData, setSensorData] = useState(null);

  // Connect to Socket.IO server
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("sensor-data", (incoming) => {
      try {
        const data = JSON.parse(incoming);
        setSensorData(data); // Update state to trigger re-render
      } catch (err) {
        console.error("Failed to parse sensor data:", err);
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition bg-gray-100 dark:bg-gray-900">

      {/* Sensor Card */}
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition">
        <h1 className="text-2xl font-bold mb-4 text-center">🌡 Sensor Dashboard</h1>

        {!sensorData ? (
          <p className="text-center text-gray-500">Waiting for live sensor data...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-gray-200 dark:bg-gray-700">
              <h2 className="text-lg font-semibold">Temperature</h2>
              <p className="text-3xl font-bold mt-1">{sensorData.temperature}°C</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-200 dark:bg-gray-700">
              <h2 className="text-lg font-semibold">Humidity</h2>
              <p className="text-3xl font-bold mt-1">{sensorData.humidity}%</p>
            </div>

            <p className="text-center text-sm opacity-70 mt-2">
              Last Updated: {sensorData.timestamp ? new Date(sensorData.timestamp).toLocaleTimeString() : "-"} ⏱
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
