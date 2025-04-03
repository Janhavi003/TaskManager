import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');


  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://taskmanager-7k7p.onrender.com/api/tasks');
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async (task) => {
    try {
      const res = await axios.post('https://taskmanager-7k7p.onrender.com/api/tasks', task);
      setTasks([...tasks, res.data]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    }
  };

  // Update task
  const updateTask = async (updatedTask) => {
    try {
      const res = await axios.put(`https://taskmanager-7k7p.onrender.com/api/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === updatedTask._id ? res.data : task)));
      setCurrentTask(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://taskmanager-7k7p.onrender.com/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    try {
      const taskToToggle = tasks.find(task => task._id === id);
      const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
      const res = await axios.put(`https://taskmanager-7k7p.onrender.com/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  // Edit task (set current task and show form)
  const editTask = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  // Filter tasks based on category or completion status
  const filteredTasks = () => {
    if (filter === 'all') return tasks;
    if (filter === 'completed') return tasks.filter(task => task.completed);
    if (filter === 'uncompleted') return tasks.filter(task => !task.completed);
    return tasks.filter(task => task.category === filter);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold dark:text-white">My Tasks</h1>
          <button
            onClick={() => {
              setCurrentTask(null);
              setShowForm(!showForm);
            }}
            className={`${
              showForm ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-medium py-2 px-4 rounded transition duration-200`}
          >
            {showForm ? 'Cancel' : 'Add New Task'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <TaskForm
            onSubmit={currentTask ? updateTask : addTask}
            currentTask={currentTask}
          />
        )}

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
            Filter Tasks:
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('Work')}
              className={`px-3 py-1 rounded ${
                filter === 'Work'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => setFilter('Personal')}
              className={`px-3 py-1 rounded ${
                filter === 'Personal'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setFilter('Urgent')}
              className={`px-3 py-1 rounded ${
                filter === 'Urgent'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Urgent
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded ${
                filter === 'completed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('uncompleted')}
              className={`px-3 py-1 rounded ${
                filter === 'uncompleted'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Active
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks()}
            onDelete={deleteTask}
            onEdit={editTask}
            onToggleComplete={toggleComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
