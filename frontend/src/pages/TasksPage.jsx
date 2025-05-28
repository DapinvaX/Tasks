import { useEffect, useState } from 'react';
import { getTasksReq, updateTaskReq, deleteTaskReq } from '../api/tasks';
import { TaskCard } from '../components/TaskCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasksReq();
      const data = response.data;
      if (Array.isArray(data)) {
        setTasks(data);
      } else if (data && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        setTasks([]);
      }
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error('Error loading tasks:', err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, data) => {
    try {
      await updateTaskReq(taskId, data);
      await loadTasks();
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskReq(taskId);
      await loadTasks();
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error('Error deleting task:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <p className="text-lg text-gray-900 dark:text-white">Cargando tareas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold transition-colors duration-200 text-blue-600 dark:text-white">Mis Tareas</h1>
        <Link
          to="/add-task"
          className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-500
            bg-blue-600 dark:bg-gray-800 text-white dark:text-white
            hover:bg-blue-600 hover:text-white hover:drop-shadow-[0_0_16px_rgba(59,130,246,0.8)]
            dark:hover:bg-gray-800 dark:hover:text-white dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]
            focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Plus size={20} />
          Nueva Tarea
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No hay tareas disponibles</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}