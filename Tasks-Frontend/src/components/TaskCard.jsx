
import PropTypes from 'prop-types';

//Le pasamos la tarea como un prop
const TaskCard = ({ task }) => {
   
    return (
        <div 
            className="taskCard bg-zinc-800 max-w-md w-full p-10 rounded-md">

                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.done ? 'Hecho' : 'Pendiente'}</p>
        
        </div>
    );
};



export default TaskCard;