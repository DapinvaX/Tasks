import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

//Importamos la función loginReq desde la API de autenticación
import { addTaskReq } from "../API/tasks.js";





const TasksForm = () => {
    
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    //Obtener los valores de los campos del formulario con el hook watch
    //para validarlos mientras se escriben a tiempo real con expresiones regulares
    const titleValue = watch("title");
    const descriptionValue = watch("description");

   

    const validateTitle = (titleValue) =>{
       
        //Validar que el titulo tiene algo para empezar a validar
        if (!/.{1,}/.test(titleValue)) {
            return true; // No mostrar otros mensajes de error si la longitud es menor a 1
        }

        //Validar que el titulo tenga al menos 3 caracteres
        if (!/.{3,}/.test(titleValue)) {
            //Se pone 2 porque el 3 tambíén cuenta
            return "El título debe tener al menos 3 caracteres.";
        }
       
        return true;

    };

    const validateDescription = (descriptionValue) => {
        
        //Validar que la descripción tiene algo para empezar a validar
        if (!/.{1,}/.test(descriptionValue)) {
            return true; // No mostrar otros mensajes de error si la longitud es menor a 1
        }

        //Validar que la descripción tenga al menos 5 caracteres
        if (!/.{5,}/.test(descriptionValue)) {
            //Se pone 2 porque el 3 tambíén cuenta
            return "La descripción debe tener al menos 5 caracteres.";
        }

        return true;
    };

    //Estado para almacenar los errores de validación
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    //UseEffect para validar el titulo cada vez que cambie
    useEffect(() => {
        const error = validateTitle(titleValue);
        if (error !== true) {
            setTitleError(error);
        } else {
            setTitleError("");
        }
    }, [titleValue]);

    useEffect(() => {
        const error = validateDescription(descriptionValue);
        if (error !== true) {
            setDescriptionError(error);
        } else {
            setDescriptionError("");
        }
    }, [descriptionValue]);

    
    
    //Función para enviar la tarea a la API
    const onSubmit = handleSubmit(async (task) => {
        
       
        // Enviar la nueva tarea a la API
        try {

            const res = await addTaskReq(task);
            console.log(res);

            //Mostrar un toast de éxito
            toast.success("Tarea añadida correctamente.", {
                className: "custom-toast",
                position: "top-center",
            });

            //Limpiar los campos del formulario
            reset();


        } catch (errors) {
            
            console.error(errors);
            toast.error("Ha ocurrido un error al añadir la tarea.", {
                className: "custom-toast-error",
                position: "top-center",
            });
        }
        
    });


    // Estado para almacenar si la tarea está hecha o no
    const [done, setDone] = useState(false);
    const handleCheckboxChange = (e) => {
        
        //Cambia el estado de la tarea a "Hecho" o "No hecho" (true o false) según el checkbox
        setDone(e.target.checked);
        done(e.target.checked);

    };

    // Estado para almacenar la previsualización de la tarea
    const [preview, setPreview] = useState({ title: "", description: "", done: false });

    useEffect(() => {
        setPreview({ title: titleValue, description: descriptionValue, done });
    }, [titleValue, descriptionValue, done]);

    // CSS personalizado para el toast
    const customToastStyle = `
    .custom-toast {
    background-color: #4caf50 !important;
    color: white !important;
    font-size: 16px !important;
    }

    .custom-toast-error {
    background-color: #f44336 !important;
    color: white !important;
    }import AddTaskPage from './AddTaskPage';

    `;

    // Añadir el estilo personalizado al documento
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customToastStyle;
    document.head.appendChild(styleSheet);

    return (
        <div className="container">
            <div className="form-section">
                <form 
                    className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                    onSubmit={onSubmit}
                >
                    <label>
                        <a>Título:</a>
                        <input 
                            type="text" 
                            name="titulo" 
                            {...register('title', 
                                {   
                                    required: "El título es obligatorio.",
                                    maxLength: { value: 50, message: "El título solo puede contener como máximo 50 caracteres." },
                                    validate: validateTitle 
                                } 
                            )} 
                        />
                        {errors.title && <small>{errors.title.message}</small>}
                        {titleError && <small>{titleError}</small>}
                                
                        </label>
                        <br />
                        <label>
                            <a>Descripción:</a>
                            <input
                                
                                id="inputDescripcion" 
                                type="text" name="description" 
                                {...register('description', 
                                    {   required: "La descripción es obligatoria.",
                                        maxLength: { value: 280, message: "La descripción solo puede contener como máximo 280 caracteres." },
                                        validate: validateDescription
                                    }
                                )}

                            />
                            {errors.description && <small>{errors.description.message}</small>}
                            {descriptionError && <small>{descriptionError}</small>}
                            </label>
                            <br />
                            <label>
                                <a>Hecho:</a>
                                <input

                                    type="checkbox" 
                                    name="done" 
                                    onChange={handleCheckboxChange}
                                    {...register('done')}
                                    />
                            </label>
                            <br />

                            <button type="submit">Guardar</button>
                            <Link to="/profile" className="btn btn-primary btnInput">Volver</Link>
                    </form>
                </div>
                <ToastContainer />
                <div className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form">
                        <h2 className="text-white">Previsualización:</h2>
                        <h3 className="text-white">{preview.title}</h3>
                        <p className="text-white">{preview.description}</p>
                        <p className="text-white">{preview.done ? "Realizado" : "No Realizado" }</p>
                </div>
        </div>
    );
};

export default TasksForm;