import './App.css'

//Importamos el Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import AddTaskPage from './pages/AddTaskPage.jsx';
import { AuthProviderProfile } from './context/AuthContextProfile.jsx';
import UpdateTaskPage from './pages/UpdateTaskPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';





function App() {
  

  return (
   
    <AuthProviderProfile>

      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="*" element={ <NotFoundPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/login" element={ <LoginPage />} />
          
          <Route element={<ProtectedRoute/>}>
              
            <Route path="/profile" element={ <ProfilePage /> } />
            <Route path="/tasks" element={ <TasksPage /> } />
            <Route path="/add-task" element={ <AddTaskPage /> } />
            <Route path="/tasks/:id" element={ <UpdateTaskPage /> } />

          </Route>
          
          
        </Routes>

      </BrowserRouter>

    </AuthProviderProfile>

  )
}

export default App
