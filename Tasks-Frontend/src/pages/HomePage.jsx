import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
    
    <h1>Home</h1>
    <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
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
  );
}

export default HomePage;
