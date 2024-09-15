import { Link } from "react-router-dom";

function TasksPage(){

    return(
        <div>
            <h1>Tasks Page</h1>
            <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/add-task">Add Task</Link>
                </li>
                <li>
                    <Link to="/tasks/:id">Update Task</Link>
                </li>
            </ul>
        </div>
        
    )

}
export default TasksPage;