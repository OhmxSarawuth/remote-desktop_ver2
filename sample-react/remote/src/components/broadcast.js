import React, { useState } from "react";

const GuacamoleBroadcast = ({ token, username }) => {
  const [broadcastCommand, setBroadcastCommand] = useState("");
  const connections = [
    { connectionId: "5" , tunnelId: "tunnel1"} 
 ]

  const sendBroadcastCommand = async () => {
    for (const conn of connections) {
      try {
        await fetch(
          `http://ohmtest.kube.baac.or.th:8080/guacamole/api/tunnels/${conn.tunnelId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `data=${encodeURIComponent(broadcastCommand)}`
          }
        );
      } catch (err) {
        console.error(`Error sending to ${conn.connectionId}:`, err);
      }
    }
    setBroadcastCommand(""); // clear input after sending
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>SSH Broadcast Control</h2>

      <input
        type="text"
        placeholder="Enter command to broadcast"
        value={broadcastCommand}
        onChange={(e) => setBroadcastCommand(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendBroadcastCommand();
        }}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        {connections.map((conn, index) => (
          <iframe
            key={conn.connectionId}
            title={`Terminal ${index + 1}`}
            src={`http://ohmtest.kube.baac.or.th:8080/guacamole/#/client/${conn.connectionId}?token=${token}`}
            width="100%"
            height="300"
            style={{ border: "1px solid #ccc" }}
          />
        ))}
      </div>
    </div>
  );
};

export default GuacamoleBroadcast;
