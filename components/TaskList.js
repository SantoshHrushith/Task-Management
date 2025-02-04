'use client';
import { useState } from 'react';
import { updateTask, deleteTask } from '../actions/taskActions';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import EditTaskForm from './EditTaskForm';
import Modal from './Modal'; // Import the Modal component

export default function TaskList({ tasks }) {
  const [editingTask, setEditingTask] = useState(null); // State to manage which task is being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleDelete = async (id) => {
    await deleteTask(id);
    window.location.reload();
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "Incomplete" ? "Complete" : "Incomplete";
    const updatedTask = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: newStatus
    };
    await updateTask(task._id, updatedTask); // Directly passing the object
    window.location.reload();
  };

  const handleEdit = (task) => {
    setEditingTask(task._id); // Set the task being edited
    setIsModalOpen(true); // Open the modal
  };

  const handleSaveEdit = () => {
    setEditingTask(null); // Close the edit form
    setIsModalOpen(false); // Close the modal
    window.location.reload();
  };

  const handleCancelEdit = () => {
    setEditingTask(null); // Close the edit form without saving
    setIsModalOpen(false); // Close the modal
  };

  if (!Array.isArray(tasks)) {
    return <p>No tasks available</p>; // Display a message if tasks is not an array
  }

  return (
    <div>
      {/* Corrected conditional rendering */}
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="mt-2 text-gray-600">{task.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="mt-2 text-sm text-gray-500">Status: {task.status}</p>
  
              {/* Buttons Section */}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(task)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {task.status === "Complete" ? "Mark Incomplete" : "Mark Complete"}
                </button>
  
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <MdDelete size={20} />
                </button>
  
                <button
                  onClick={() => handleEdit(task)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <FaRegEdit size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
  
      {/* Modal to edit task */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {editingTask && (
            <EditTaskForm
              task={tasks.find((t) => t._id === editingTask)} // Find the task by ID
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          )}
        </Modal>
      )}
    </div>
  );
  

}
