// src/services/authService.ts

export type AuthResponse = {
  authToken: string;
  username: string;
};

export async function login(username: string, password: string): Promise<AuthResponse> {
  const response = await fetch("http://localhost:3001/api/tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return {
    authToken: data.authToken,
    username: data.username,
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

export function getStoredAuth(): AuthResponse | null {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return null;
  return { authToken: token, username };
}
