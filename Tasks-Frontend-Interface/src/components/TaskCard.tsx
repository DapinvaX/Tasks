import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Task, EditTaskPayload } from '../types';

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: number, data: EditTaskPayload) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedCompleted, setEditedCompleted] = useState(task.completed);

  const handleSave = async () => {
    await onUpdate(task.id, {
      title: editedTitle,
      description: editedDescription,
      completed: editedCompleted,
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      await onDelete(task.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 transition-colors duration-200">
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
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.completed}
              readOnly
              className="h-4 w-4 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="dark:text-gray-300">Completada</span>
          </div>
        </>
      )}
    </div>
  );
}