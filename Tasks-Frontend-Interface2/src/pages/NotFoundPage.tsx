import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
      <div className="text-center px-4">
        <AlertCircle className="w-20 h-20 text-red-600 dark:text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Página no encontrada
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 font-medium transition-colors duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}