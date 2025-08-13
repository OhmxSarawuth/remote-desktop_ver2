import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import HostListPage from "./components/HostListPage";
//import GuacamoleBroadcast from "./components/broadcast";
function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const handleLogin = (authToken, username) => {
    setToken(authToken);
    setUsername(username);
  };

  return token ? (
    <HostListPage token={token} username={username} />
    //<GuacamoleBroadcast token={token} username={username} /> 
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}

export default App;
