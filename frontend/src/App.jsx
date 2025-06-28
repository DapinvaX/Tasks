/**
 * Componente principal de la aplicación.
 * Configura el enrutamiento y los proveedores de contexto.
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TasksContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TasksPage } from './pages/TasksPage';
import { AddTaskPage } from './pages/AddTaskPage';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import 'react-toastify/dist/ReactToastify.css';
import ChatbotButton from './components/UI/ChatbotButton';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ThemeProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={
                    <PageTransition>
                      <HomePage />
                    </PageTransition>
                  } />
                  <Route path="/login" element={
                    <PageTransition>
                      <LoginPage />
                    </PageTransition>
                  } />
                  <Route path="/register" element={
                    <PageTransition>
                      <RegisterPage />
                    </PageTransition>
                  } />
                  <Route path="/tasks" element={
                    <ProtectedRoute>
                      <PageTransition>
                        <TasksPage />
                      </PageTransition>
                    </ProtectedRoute>
                  } />
                  <Route path="/add-task" element={
                    <ProtectedRoute>
                      <PageTransition>
                        <AddTaskPage />
                      </PageTransition>
                    </ProtectedRoute>
                  } />
                  <Route path="/tasks/:id" element={
                    <ProtectedRoute>
                      <PageTransition>
                        <AddTaskPage />
                      </PageTransition>
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <ToastContainer />
              <ChatbotButton />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;