import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, currentTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'Work',
    completed: false
  });

  useEffect(() => {
    if (currentTask) {
      setTask({
        ...currentTask,
        dueDate: currentTask.dueDate ? new Date(currentTask.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Task:', task);
    await onSubmit(task);
    resetForm();
  };

  const resetForm = () => {
    setTask({
      title: '',
      description: '',
      dueDate: '',
      category: 'Work',
      completed: false
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        {currentTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none h-24"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none 
             bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="h-4 w-4 border-gray-300 rounded"
          />
          <label className="ml-2 block text-gray-200" htmlFor="completed">
            Completed
          </label>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {currentTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
