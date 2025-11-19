import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", );

    socket.on("sensor-data", (incoming) => {
      setData({ ...JSON.parse(incoming) }); // force re-render

    });

    return () => socket.disconnect();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Smart Sensor Dashboard</h1>

      {!data ? (
        <p style={styles.wait}>Waiting for live sensor data...</p>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.temp}>🌡 Temperature: {data.temperature} °C</h2>
          <h2 style={styles.humidity}>💧 Humidity: {data.humidity} %</h2>
          <p style={styles.time}>
            ⏱ {new Date(data.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    padding: "40px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  wait: {
    fontSize: "20px",
    marginTop: "30px",
    color: "#666",
  },
  card: {
    display: "inline-block",
    padding: "25px 40px",
    background: "#f8f8f8",
    borderRadius: "15px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  temp: {
    fontSize: "24px",
    margin: "10px 0",
  },
  humidity: {
    fontSize: "24px",
    margin: "10px 0",
  },
  time: {
    marginTop: "15px",
    color: "#555",
  },
};
