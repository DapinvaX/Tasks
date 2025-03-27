/**
 * Componente principal de la aplicación.
 * Configura el enrutamiento y los proveedores de contexto.
 * 
 * Características:
 * - Manejo de autenticación a través de AuthProvider
 * - Sistema de temas claro/oscuro con ThemeProvider
 * - Rutas protegidas para contenido autenticado
 * - Diseño responsivo con Tailwind CSS
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TasksPage } from './pages/TasksPage';
import { AddTaskPage } from './pages/AddTaskPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Rutas protegidas que requieren autenticación */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<AddTaskPage />} />
                </Route>

                {/* Ruta para páginas no encontradas */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;