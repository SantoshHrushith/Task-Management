// actions/taskActions.js
'use server';
import dbConnect from '../lib/db';
import Task from '../models/Task';

export async function createTask(formData) {
  if (!formData) {
    return { success: false, error: "Form data is missing" };
  }

  await dbConnect();

  let title, description, dueDate;
  
  if (typeof formData.get === 'function') {
    // If formData is a FormData object
    title = formData.get('title');
    description = formData.get('description');
    dueDate = formData.get('dueDate');
  } else {
    // If formData is a plain object (server-side)
    ({ title, description, dueDate } = formData);
  }

  // Validate required fields
  if (!title || !description || !dueDate) {
    return { success: false, error: "All fields are required." };
  }

  // Convert `dueDate` to a valid Date object
  const parsedDate = new Date(dueDate);
  if (isNaN(parsedDate)) {
    return { success: false, error: "Invalid date format." };
  }

  const task = new Task({ title, description, dueDate: parsedDate });
  console.log(task);
  
  try {
    await task.save();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


export async function getNonCompletedTasks() {
  await dbConnect();
  
  const tasks = await Task.find({ status: { $ne: "Complete" } });

  if (!tasks || !Array.isArray(tasks)) {
    console.error("getTasks() did not return an array:", tasks);
    return [];
  }

  // Serialize tasks before returning to ensure they're in a proper format
  return JSON.parse(JSON.stringify(tasks));
}


export async function getTasks() {
  await dbConnect();
  
  const tasks = await Task.find({});

  if (!tasks || !Array.isArray(tasks)) {
    console.error("getTasks() did not return an array:", tasks);
    return [];
  }

  // Auto-update tasks that are past due
  const updatedTasks = tasks.map(async (task) => {
    if (task.status === "Incomplete" && new Date(task.dueDate) < new Date()) {
      task.status = "Pending";
      await task.save();
    }
    return task;
  });

  return JSON.parse(JSON.stringify(await Promise.all(updatedTasks)));
}

export async function updateTask(id, updatedTask) {
  await dbConnect();

  const { title, description, dueDate, status } = updatedTask;

  // Ensure dueDate is a valid date before saving it
  const parsedDueDate = new Date(dueDate);

  if (isNaN(parsedDueDate)) {
    return { success: false, error: 'Invalid date format' };
  }

  await Task.findByIdAndUpdate(id, {
    title,
    description,
    dueDate: parsedDueDate,
    status,
  });

  return { success: true };
}




export async function deleteTask(id) {
  await dbConnect();
  await Task.findByIdAndDelete(id);
  return { success: true };
}