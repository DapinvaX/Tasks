import { Link } from "react-router-dom";

import { useAuthProfile } from '../context/AuthContextProfile.jsx';

function ProfilePage() {

    const { user, isAuthenticated } = useAuthProfile();

    //Rec
    

    return (
        
        <div>
            
            {isAuthenticated ? (
                <>
                    <h1>Perfil de {user.user}</h1>
                    <Link to="/tasks" className="btn btn-primary btnInput">Tasks</Link>
                    <Link to="/add-task" className="btn btn-primary btnInput">Añadir Tarea</Link>
                    <Link to="/tasks/:id" className="btn btn-primary btnInput">Update Task</Link>
                </>
            ) : (
                <>
                    <h1>Perfil</h1>
                    <Link to="/login" className="btn btn-primary btnLogin">Login</Link>
                    <Link to="/register" className="btn btn-primary btnRegister">Registrar</Link>
                </>
            )}

        </div>

    )
}
export default ProfilePage;

 {/*   <Link to="/tasks" className="btn btn-primary btnInput">Tasks</Link>
                
                
                    <Link to="/add-task" className="btn btn-primary btnInput">Add Task</Link>
                
                
                    <Link to="/tasks/:id" className="btn btn-primary btnInput">Update Task</Link> */}