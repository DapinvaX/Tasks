import { Link } from '@nextui-org/react';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { toast, ToastContainer } from 'react-toastify';

import {deleteTaskReq, } from '../API/tasks.js';

// CSS personalizado para el toast
const customToastStyle = `
    
.custom-toast {
    background-color: #4caf50 !important;
    color: white !important;
    font-size: 16px !important;
    position: top-center !important;
}

.custom-toast-error {
    background-color: #f44336 !important;
    color: white !important;
    font-size: 16px !important;
    position: top-center !important;
}

.custom-toast-delete {
    background-color: #ff9800 !important;
    color: white !important;
    font-size: 16px !important;
    position: top-center !important;
}

`;

// Añadir el estilo personalizado al documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customToastStyle;
document.head.appendChild(styleSheet);

//Le pasamos la tarea como un prop
const TaskCard = () => {

    const { register } = useForm();
    
    const [done, setDone] = useState(false);
    const handleCheckboxChange = (e) => {
           
            //Cambia el estado de la tarea a "Hecho" o "No hecho" (true o false) según el checkbox
            setDone(e.target.checked);
            done(e.target.checked);
    
        };

    const handleDeleteTask = async () => {
        
        try{
            const res = await deleteTaskReq();
            console.log(res);

            //Mostrar un toast de éxito
            toast.success("Tarea eliminada correctamente.", {
                className: "custom-toast-delete",
                position: "top-center",
            });

        }catch(error){
            console.log(error);
            //Mostrar un toast de error
            toast.error("Error al eliminar la tarea.", {
                className: "custom-toast-error",
                position: "top-center",
            });
        }

    };



    return (
        <>
            <style>{`
                
                .button-container {
                display: flex;
                justify-content: center;
                gap: 10px; /* Espacio entre los botones */
                margin-top: 10px; /* Espacio superior para separar los botones del checkbox */
            }

            .task-button {
                padding: 5px 10px; /* Tamaño reducido de los botones */
                font-size: 0.875rem; /* Tamaño de fuente reducido */
            }

                `}
                            </style>
            <div 
                className="TaskCard bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form">

                    <h3>Titulo</h3>
                    <p>Descrición</p>
                    <label>
                        Hecho:
                    <input
                        type="checkbox" 
                        name="done"
                        checked
                        disabled 
                        onChange={handleCheckboxChange}
                        {...register('done')}
                        />
                    </label>
                        <div className="button-container">
                            <Link to="/tasks/:id"  className="btn btn-primary btnInput">Editar</Link>
                            <Link className='btn btn-primary btnInput' onClick={handleDeleteTask}>Eliminar</Link>
                        </div>
            </div>
            <ToastContainer />
        </>
    );
};



export default TaskCard;