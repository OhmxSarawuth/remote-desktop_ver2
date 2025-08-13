
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route
    //       path="/"
    //       element={isAuthenticated ? <MyPage /> : <Navigate to="/login" />}
    //     />
    //   </Routes>
    // </Router>
// src/App.tsx
import { useState } from 'react';
import GuacamoleClient from './components/GuacamoleClient';

function App() {
  const [connected, setConnected] = useState(false);
  const [wsUrl, setWsUrl] = useState('ws://localhost:8080/guacamole/websocket-tunnel');
  const [params, setParams] = useState('token=xxx');

  return (
    <div style={{ padding: 20 }}>
      {!connected ? (
        <div>
          <h1>Guacamole Minimal GUI</h1>
          <label>WebSocket Tunnel URL:</label><br />
          <input value={wsUrl} onChange={(e) => setWsUrl(e.target.value)} style={{ width: '80%' }} /><br /><br />

          <label>Connection Parameters:</label><br />
          <input value={params} onChange={(e) => setParams(e.target.value)} style={{ width: '80%' }} /><br /><br />

          <button onClick={() => setConnected(true)}>Connect</button>
        </div>
      ) : (
        <GuacamoleClient tunnelUrl={wsUrl} connectionParams={params} />
      )}
    </div>
  );
}

export default App;

