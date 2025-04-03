import { motion } from 'framer-motion'

const TaskList = ({ tasks = [], onDelete, onEdit, onToggleComplete }) => {
  if (!Array.isArray(tasks)) {
    console.error('Error: tasks is not an array', tasks);
    return <div className="text-center py-8 text-red-500">Tasks data is invalid</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No tasks found. Add some tasks to get started!
      </div>
    );
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Work':
        return 'bg-blue-500';
      case 'Personal':
        return 'bg-green-500';
      case 'Urgent':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`bg-white dark:bg-gray-700 rounded-lg shadow p-4 border-l-4 ${
            task.completed ? 'border-green-500' : 'border-blue-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task._id)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <div className="ml-3 flex-grow">
                <h3 className={`font-medium ${
                  task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'
                }`}>
                  {task.title}
                </h3>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button onClick={() => onDelete(task._id)} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {task.description && (
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full text-white ${getCategoryColor(task.category)}`}>
                {task.category}
              </span>
              {task.dueDate && (
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;
