import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
      <div className="max-w-2xl mx-auto text-center px-4">
        <ClipboardList className="w-24 h-24 text-blue-600 dark:text-blue-400 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Gestiona tus tareas de forma eficiente
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Organiza, planifica y realiza un seguimiento de tus tareas diarias de manera sencilla.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 font-medium transition-colors duration-200"
          >
            Comenzar ahora
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 font-medium border border-blue-600 dark:border-blue-400 transition-colors duration-200"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}