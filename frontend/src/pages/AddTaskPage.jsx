import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTaskReq } from '../api/tasks';
import { Plus } from 'lucide-react';
import { TextInput } from '../components/UI/TextInput';
import { TextArea } from '../components/UI/TextArea';

export function AddTaskPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const now = new Date();
      const createdAt = now.toISOString();
      const finalDate = date || (now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0'));
      await addTaskReq({ title, description, completed, createdAt, date: finalDate });
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
              <TextInput
                id="title"
                label="Título"
                placeholder="Introduce el título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <TextArea
                id="description"
                label="Descripción"
                placeholder="Introduce la descripción de la tarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-0">Fecha límite</label>
                <select
                  id="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="block rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Sin fecha límite</option>
                  
                  <option value={new Date().toISOString().slice(0, 10) + 
                    ' 23:59:59'}>Hoy
                  </option>

                  <option value={(() => { const d = new Date(); d.setDate(d.getDate() + 1); 
                    return d.toISOString().slice(0, 10) + ' 23:59:59'; })()}>Mañana
                    </option>
                  
                  <option value={(() => { const d = new Date(); d.setDate(d.getDate() + 7); 
                    return d.toISOString().slice(0, 10) + ' 23:59:59'; })()}>En 1 semana
                    </option>
                  
                  <option value={(() => { const d = new Date(); d.setMonth(d.getMonth() + 1); 
                    return d.toISOString().slice(0, 10) + ' 23:59:59'; })()}>En 1 mes
                    </option>

                </select>
              </div>
              <div className="flex items-center ml-4">
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