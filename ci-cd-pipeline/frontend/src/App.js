import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminSignup from "./Pages/AdminSignup";
import TaskCreate from "./Pages/TaskCreate";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>UI Test App</h1>
        <nav>
          <Link to="/signup" style={{ marginRight: "10px" }}>Admin Signup</Link>
          <Link to="/task">Task Create</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="/task" element={<TaskCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
