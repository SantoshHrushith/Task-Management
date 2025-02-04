'use client';
import { useEffect, useState } from 'react';
import { getNonCompletedTasks, getTasks } from '../actions/taskActions';
import TaskList from './TaskList';

export default function Tasks() {
  const [tasks, setTasks] = useState([]); // State for non-completed tasks or all tasks
  const [allTasks, setAllTasks] = useState([]); // State for all tasks
  const [loading, setLoading] = useState(true);
  const [showAllTasks, setShowAllTasks] = useState(false); // State to toggle all tasks

  useEffect(() => {
    async function fetchData() {
      try {
        const nonCompletedTasks = await getNonCompletedTasks();
        const allTasksData = await getTasks();
        setTasks(nonCompletedTasks); // Initially, display non-completed tasks
        setAllTasks(allTasksData); // Store all tasks data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // This effect runs once when the component mounts

  // Define the handler for toggling between non-completed tasks and all tasks
  const handleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks); // Toggle the state
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <div className=" w- full relative bg-[#77777710] p-4 rounded-lg shadow-lg h-[600px] overflow-y-auto hover:shadow-xl transition-all duration-300">
        {/* <h1 className=" text-3xl font-semibold text-center ">Tasks</h1> */}
        <button
          className="absolute top-0 right-0 m-4  p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleShowAllTasks}>
          {showAllTasks ? ' Click to Show Non-Completed Tasks' : ' Click to Show All Tasks'}
        </button>
        {/* Show either all tasks or non-completed tasks based on state */}
        <div className="mt-16">
      <TaskList tasks={showAllTasks ? allTasks : tasks} />
    </div>
      </div>
    </div>
  );
}
