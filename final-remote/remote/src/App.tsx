import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/hostlist" replace />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<div className="p-4">404 Not Found</div>} />
      </Routes>
    </Router>
  );
}
