import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {


  const res = await fetch("http://localhost:3001/api/guac/getAuthToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // *** ข้อควรระวัง: CORS ***
          // หาก React App และ Guacamole ไม่ได้รันบน Domain/Port เดียวกัน
          // คุณอาจต้องตั้งค่า CORS บน Guacamole Tomcat (ใน web.xml)
          // หรือใช้ Proxy ใน development environment
        },
        body: JSON.stringify({username: username, password: password})
      });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("authToken", data.authToken);
    localStorage.setItem("username", data.username);
    localStorage.setItem("dataSource", data.dataSource);
    window.location.href = "/";
  } else {
    alert("Login failed");
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
