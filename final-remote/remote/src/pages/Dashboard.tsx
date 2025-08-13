import { Routes, Route, NavLink, Navigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HostList from "./HostList";
import StarCat from "./StarCat";
import BranchSearch from "./BranchSearch";

export default function Dashboard() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");

  const login = async () => {
    try {
      const res = await fetch("http://localhost:8080/guacamole/api/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: inputUser, password: inputPass }),
      });

      const data = await res.json();
      if (data.authToken) {
        setToken(data.authToken);
        setUsername(data.username);
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("username", data.username);
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.clear();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow">
        <h1 className="text-xl font-bold">Guacamole Dashboard</h1>
        <div className="flex items-center space-x-2">
          {token && username ? (
            <>
              <span className="text-green-600 font-medium">👤 {username}</span>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <input
                className="border px-2 py-1 rounded"
                placeholder="Username"
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
              />
              <input
                className="border px-2 py-1 rounded"
                type="password"
                placeholder="Password"
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
              />
              <button onClick={login} className="px-3 py-1 bg-blue-500 text-white rounded">
                Login
              </button>
            </>
          )}
        </div>
      </div>

      {/* TabBar */}
      <div className="flex justify-center bg-gray-200 p-2">
        <NavLink
          to="hostlist"
          className={({ isActive }) =>
            `px-4 py-2 mx-1 rounded ${
              isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-blue-100"
            }`
          }
        >
          HostList
        </NavLink>
        <NavLink
          to="starcat"
          className={({ isActive }) =>
            `px-4 py-2 mx-1 rounded ${
              isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-blue-100"
            }`
          }
        >
          StarCat
        </NavLink>
        <NavLink
          to="branchsearch"
          className={({ isActive }) =>
            `px-4 py-2 mx-1 rounded ${
              isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-blue-100"
            }`
          }
        >
          Branch Search
        </NavLink>
      </div>

      {/* Nested Routes */}
      <div className="p-4">
        <Routes>
          <Route index element={<Navigate to="hostlist" replace />} />
          <Route path="hostlist" element={<HostList />} />
          <Route path="starcat" element={<StarCat />} />
          <Route path="branchsearch" element={<BranchSearch />} />
        </Routes>
      </div>
    </div>
  );
}
