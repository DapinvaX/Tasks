import { Link } from 'react-router-dom';
import { useAuthProfile } from '../context/AuthContextProfile.jsx';

function Navbar() {

  const { isAuthenticated, logout, user } = useAuthProfile();
  console.log(isAuthenticated, user)

  return (
    
    <div>
        <nav className="navbar my-3 flex justify-between py-5 px-10">
            <Link className="navbar-brand" to="/">
                <h1>Task Manager</h1>
            </Link>
            <div className="divLogin">
                
                {/* <Link to="/register" className="btn btn-primary btnRegister">Registrar</Link>
                <Link to="/login" className="btn btn-primary btnLogin">Login</Link>
                <Link className="btn btn-secondary btnLogout">Logout</Link> */}

                <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            
              <Link to="/profile" className='userLabel'>Bienvenido {user.user}!</Link>
           
              <Link to="/add-task" className="btn btn-primary btnAddTask">Añadir Tarea</Link>
              
              <Link to="/" className="btn btn-secondary btnLogout" onClick={() => logout()}>
                Logout
              </Link>
              
            
          </>
        ) : (
          <>
            <div className="flex gap-x-2">
              <Link to="/register" className="btn btn-primary btnRegister">
                Registrar
              </Link>
              <Link to="/login" className="btn btn-primary btnLogin">
                Login
              </Link>
            </div>
            
          </>
        )}
      </ul>
                
            </div>
            
        </nav>
    </div>
  )
}

export default Navbar
