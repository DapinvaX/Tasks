import { Link } from "react-router-dom";

import TasksForm from "../components/TasksForm";

function AddTaskPage(){

    return (
        
        <div>

            <h1>Añadir Task</h1>
                <TasksForm/>
            
            <ul>
                <Link to="/profile" className="btn btn-primary btnInput">Perfil</Link>
            </ul>
            

        </div>
       
    );

}
export default AddTaskPage;