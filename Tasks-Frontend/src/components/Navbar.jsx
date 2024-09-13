
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div>
        <nav className="navbar my-3 flex justify-between py-5 px-10">
            <Link className="navbar-brand" to="/">
                <h1>Task Manager</h1>
            </Link>
            <div className="divLogin">
                <Link to="/login" className="btn btn-primary btnLogin">Login</Link>
                <Link to="/register" className="btn btn-primary btnRegister">Registrar</Link>
            </div>
            
        </nav>
    </div>
  )
}

export default Navbar
