import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MyPage from "./components/MyPage";
import LoginPage from "./components/LoginPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={isAuthenticated ? <MyPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
