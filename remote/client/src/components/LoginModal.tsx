// src/components/LoginModal.tsx
import React, { useState } from "react";
import { login } from "../services/authService";

type LoginModalProps = {
  onClose: () => void;
  onLoginSuccess: (token: string, username: string) => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await login(formUsername, formPassword);
      localStorage.setItem("token", result.authToken);
      localStorage.setItem("username", result.username);
      onLoginSuccess(result.authToken, result.username);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded p-2"
            value={formUsername}
            onChange={(e) => setFormUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded p-2"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleLogin}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
