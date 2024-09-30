

import { Link } from "react-router-dom";


import { useAuthProfile } from '../context/AuthContextProfile.jsx';

import TaskCard from "../components/TaskCard.jsx";


function TasksPage(){

    const { user, isAuthenticated } = useAuthProfile();


    return(
        <div>

        {isAuthenticated ? (

                        <>
                        <h1>Tareas de {user.user}</h1>
                            <Link to="/profile"    className="btn btn-primary btnInput">Profile</Link>
                            <Link to="/add-task"   className="btn btn-primary btnInput">Add Task</Link>
                            <Link to="/tasks/:id"  className="btn btn-primary btnInput">Update Task</Link> {/* PROVISIONAL  */}
                            <div className="tasksContainer">
                                {/* Aquí se mostrarán las tareas (Se replicará el componente TaskCard tantas veces como tareas haya, cada uno asociado a un ID de su tarea) */}
                                <TaskCard/>                            
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Páginas de Tareas</h1>
                            <p>Debes estar autenticado para ver sus tareas</p>
                        </>
                    )}         
                
                </div>
    
    )
}
export default TasksPage;