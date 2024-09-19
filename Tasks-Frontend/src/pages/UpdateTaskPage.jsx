

import { Link } from 'react-router-dom';
import TasksForm from './../components/TasksForm';

//Importamos la librería de Toastify
//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




// CSS personalizado para el toast
const customToastStyle = `
.custom-toast {
background-color: #4caf50 !important;
color: white !important;
font-size: 16px !important;
}
`;

// Añadir el estilo personalizado al documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customToastStyle;
document.head.appendChild(styleSheet);


function UpdateTaskPage(){
   
    //Una vez que tenemos el id, necesitamos obtener la tarea de la base de datos.
    return(

        <div>
            <h1>Modificar Task</h1>
            <TasksForm/>
            <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </div>
        
    );
}
export default UpdateTaskPage;