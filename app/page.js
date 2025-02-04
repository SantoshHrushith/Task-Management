import TaskForm from '../components/TaskForm';
import Tasks from '../components/Tasks';

export default async function Home() {
  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-center">Task Management</h1>
      <div className="flex justify-even gap-10"> {/* Adjust spacing as needed */}
        <div className="w-400px"> {/* Adjust width as needed */}
          <TaskForm />
        </div>
        <div className="w-[900px]"> {/* Adjust width as needed */}
          <Tasks />
        </div>
      </div>
    </div>
  );
}
