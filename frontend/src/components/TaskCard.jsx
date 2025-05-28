import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * Componente que muestra una tarea individual con opciones de edición y eliminación.
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.task - Datos de la tarea
 * @param {Function} props.onUpdate - Función para actualizar la tarea
 * @param {Function} props.onDelete - Función para eliminar la tarea
 */
export function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedCompleted, setEditedCompleted] = useState(task.done);
  const [editedDate, setEditedDate] = useState(task.date ? new Date(task.date).toISOString().slice(0, 16) : '');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = async () => {
    await onUpdate(task._id, {
      title: editedTitle,
      description: editedDescription,
      done: editedCompleted,
      date: editedDate ? new Date(editedDate) : null,
    });
    setIsEditing(false);
    toast.success('Tarea actualizada correctamente', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDelete = async () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    await onDelete(task._id);
    setShowConfirm(false);
    toast.success('Tarea eliminada correctamente', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 transition-colors duration-200 relative">
      {showConfirm && (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 mt-2 z-50 w-full max-w-md flex justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center border border-red-400 dark:border-red-700">
            <p className="mb-4 text-gray-900 dark:text-white">¿Estás seguro de que quieres eliminar esta tarea?</p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editedCompleted}
              onChange={(e) => setEditedCompleted(e.target.checked)}
              className="h-4 w-4 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="dark:text-gray-300">Completada</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="dark:text-gray-300">Fecha límite:</label>
            <select
              value={editedDate === '' ? '' : editedDate}
              onChange={e => setEditedDate(e.target.value)}
              className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Sin fecha límite</option>
              <option value={new Date().toISOString().slice(0, 10) + 'T23:59:59'}>Hoy</option>
              <option value={(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10) + 'T23:59:59'; })()}>Mañana</option>
              <option value={(() => { const d = new Date(); d.setDate(d.getDate() + 7); return d.toISOString().slice(0, 10) + 'T23:59:59'; })()}>En 1 semana</option>
              <option value={(() => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d.toISOString().slice(0, 10) + 'T23:59:59'; })()}>En 1 mes</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
            >
              <Check size={20} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
          <div className="flex items-center space-x-2 mb-2">
            <span className="dark:text-gray-300 font-medium">Fecha límite:</span>
            <span className="dark:text-gray-200">{!task.date ? 'Sin fecha límite' : new Date(task.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            {task.done ? (
              <Check size={24} className="text-green-500" title="Completada" />
            ) : (
              <X size={24} className="text-red-500" title="No completada" />
            )}
            <span className="dark:text-gray-300">{task.done ? 'Completada' : 'No completada'}</span>
          </div>
        </>
      )}
    </div>
  );
}