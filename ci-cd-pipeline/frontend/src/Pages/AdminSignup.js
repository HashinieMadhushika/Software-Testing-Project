import React, { useState } from "react";
import "./AdminSignup.css";

export default function AdminSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setMessage(data.message);

    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div>
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="username"
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password"
          />
        </div>
        <button type="submit" data-testid="signup-btn">Signup</button>
      </form>
      {message && <p data-testid="signup-msg">{message}</p>}
    </div>
  );
}
