'use client';
import { createTask } from '../actions/taskActions';
import { useState } from 'react';

export default function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { title, description, dueDate };
        console.log("📤 Submitting Form Data:", formData);

        const result = await createTask(formData);
        console.log("🛠 Task Creation Result:", result);

        if (result.success) {
            alert("Task created successfully!");
            window.location.reload();
        } else {
            alert("Error: " + result.error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full p-6 bg-[#77777710] rounded-lg shadow-md space-y-10 h-fit"
            >
            <div className="space-y-4 width-full">

                {/* Task Title */}
                <div>
                    <label htmlFor="title" className="text-gray-700 font-semibold mb-2">Task Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description and Due Date */}
                
                    <div>
                        <label htmlFor="description" className="text-gray-700 font-semibold mb-2">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="text-gray-700 font-semibold mb-2">Due Date</label>
                        <input
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create Task
                </button>
            </div>
        </form >
    );
}
