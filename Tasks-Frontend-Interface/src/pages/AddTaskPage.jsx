import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTaskReq } from '../api/tasks';
import { Plus } from 'lucide-react';

export function AddTaskPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createTaskReq({ title, description, completed });
      navigate('/tasks');
    } catch (err) {
      setError('Error al crear la tarea. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nueva Tarea</h1>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="completed"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
              />
              <label htmlFor="completed" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Realizada
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Creando...' : 'Crear Tarea'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}