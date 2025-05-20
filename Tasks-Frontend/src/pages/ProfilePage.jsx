// Archivo obsoleto. Puede ser eliminado. Ahora el perfil y las tareas del usuario están en TasksPage.

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
                    <h1>Perfil de Usuario</h1>
                    <p>Debes estar autenticado para ver tu perfil</p>
                </>
            )}

        </div>

    )
}
export default ProfilePage;

 {/*   <Link to="/tasks" className="btn btn-primary btnInput">Tasks</Link>
                
                
                    <Link to="/add-task" className="btn btn-primary btnInput">Add Task</Link>
                
                
                    <Link to="/tasks/:id" className="btn btn-primary btnInput">Update Task</Link> */}