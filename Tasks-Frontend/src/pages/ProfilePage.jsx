import { Link } from "react-router-dom";

function ProfilePage() {
    return (
        
        <div>
            <h1>Profile Page</h1>

            <ul>
                <li>
                    <Link to="/tasks">Tasks</Link>
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
export default ProfilePage;