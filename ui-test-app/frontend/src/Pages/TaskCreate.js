import React, { useState } from "react";
import "./TaskCreate.css";

export default function TaskCreate() {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !dueDate) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName, dueDate }),
      });

      const data = await response.json();
      setMessage(data.message);

    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Task creation error:", error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name: </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            data-testid="task-name"
          />
        </div>
        <div>
          <label>Due Date: </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            data-testid="due-date"
          />
        </div>
        <button type="submit" data-testid="task-btn">Create Task</button>
      </form>
      {message && <p data-testid="task-msg">{message}</p>}
    </div>
  );
}
