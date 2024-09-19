import { Link } from "react-router-dom";

function TasksPage(){

    return(
        <div>
            <h1>Tasks Page</h1>
           
                    <Link to="/profile"    className="btn btn-primary btnInput">Profile</Link>
                
                    <Link to="/add-task"   className="btn btn-primary btnInput">Add Task</Link>
               
                    <Link to="/tasks/:id"  className="btn btn-primary btnInput">Update Task</Link>

                    
               
        </div>
        
    )

}
export default TasksPage;