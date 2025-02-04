'use client';
import { useState, useEffect } from 'react';
import { updateTask } from '../actions/taskActions';

export default function EditTaskForm({ task, onSave, onCancel }) {
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);
  const [updatedDueDate, setUpdatedDueDate] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState(task.status);

  // Format the dueDate for the input field when the task data is first loaded
  useEffect(() => {
    if (task.dueDate) {
      const formattedDate = new Date(task.dueDate).toISOString().split('T')[0]; // Get YYYY-MM-DD format
      setUpdatedDueDate(formattedDate);
    }
  }, [task.dueDate]); // Runs when task.dueDate is updated

  const handleSave = async () => {
    // Validate dueDate to avoid invalid date format
    const isValidDate = !isNaN(new Date(updatedDueDate).getTime());
    if (!isValidDate) {
      alert('Please select a valid due date.');
      return;
    }
  
    const updatedTaskData = {
      title: updatedTitle,
      description: updatedDescription,
      dueDate: updatedDueDate,
      status: updatedStatus,
    };
  
    await updateTask(task._id, updatedTaskData);
    onSave(); // Notify parent component that editing is complete
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600">Title:</label>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Description:</label>
        <input
          type="text"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Due Date:</label>
        <input
          type="date"
          value={updatedDueDate}
          onChange={(e) => setUpdatedDueDate(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Status:</label>
        <select
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Incomplete">Incomplete</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
