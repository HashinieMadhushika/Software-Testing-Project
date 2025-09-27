const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // To parse JSON request bodies

const PORT = 5000;

// 1. Admin Signup Endpoint
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  // In a real app, you'd save this to a database
  console.log(`New signup: ${username}`);
  res.status(201).json({ message: 'Signup successful!' });
});

// 2. Task Creation Endpoint
app.post('/api/tasks', (req, res) => {
  const { taskName, dueDate } = req.body;

  if (!taskName || !dueDate) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const today = new Date().toISOString().split('T')[0];
  if (dueDate < today) {
    return res.status(400).json({ message: 'Due date cannot be in the past!' });
  }

  // In a real app, you'd save this to a database
  console.log(`New task: ${taskName}, Due: ${dueDate}`);
  res.status(201).json({ message: 'Task created successfully!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
