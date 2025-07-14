import React, { useState } from "react";
import { Host } from "../models";

interface HostCardProps {
  host: Host;
}

const HostCard: React.FC<HostCardProps> = ({ host }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [connectBy, setConnectBy] = useState<"guacamole" | "genRDP" | "checkLog">("guacamole");

  // ดึง user_id ที่ login แล้วจาก localStorage
  const authToken = localStorage.getItem("authToken");

  const handleConnect = () => {
    const selectedUser = host.user.find((u) => u.user_id === selectedUserId);
    if (!selectedUser) {
      alert("Please select a user.");
      return;
    }


    if (connectBy === "checkLog"){
        console.log(`userId\nhost: ${host.ip}\nport: ${host.port}\nnuser: ${selectedUser.username}\npassword: ${selectedUser.password}`);
    }
    else if (connectBy === "guacamole") {
      // ส่ง user_id ที่ login ไปด้วยใน URL หรือ header ถ้าจำเป็น
      const url = `http://localhost:80/guacamole/#/client/${host.id}?user=${authToken}`;
      window.open(url, "_blank");
    } else if (connectBy === "genRDP") {
      // ส่ง user_id ที่ login ไปยัง backend
      fetch(`/api/generate-rdp?user=${selectedUser.username}&ip=${host.ip}&authUser=${authToken}`)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${selectedUser.username}.rdp`;
          a.click();
        });
    }
  };

  

  return (
    <li className="mb-4 p-4 border rounded">
      <div className="font-semibold text-lg">{host.name}</div>
      <div className="text-sm text-gray-500 mb-2">
        IP: {host.ip}:{host.port} | Tags: {host.tags.join(", ")}
      </div>

      <div className="mb-2">
        <label className="mr-2">User:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedUserId ?? ""}
          onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
        >
          <option value="">-- Select User --</option>
          {host.user.map((u) => (
            <option key={u.user_id} value={u.user_id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="mr-2">Connect by:</label>
        <select
          className="border rounded px-2 py-1"
          value={connectBy}
          onChange={(e) => setConnectBy(e.target.value as "guacamole" | "genRDP" | "checkLog")}
        >
          <option value="guacamole">Guacamole</option>
          <option value="genRDP">Generate RDP</option>
          <option value="checkLog">checkLog</option>
        </select>
      </div>

      <button
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleConnect}
      >
        Connect
      </button>
    </li>
  );
};

export default HostCard;
