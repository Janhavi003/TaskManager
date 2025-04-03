const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// GET all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, dueDate, category, completed } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = new Task({ user: req.user._id, title, description, dueDate, category, completed });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
