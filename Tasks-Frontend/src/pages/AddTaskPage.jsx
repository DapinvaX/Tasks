import { Link } from "react-router-dom";

import TasksForm from "../components/TasksForm";

function AddTaskPage(){

    return (
        
        <div>
            <h1>Añadir Task</h1>
            <TasksForm/>
            <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </div>
       
    );

}
export default AddTaskPage;