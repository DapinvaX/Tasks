/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";

//Importamos las funciones de la API para el CRUD de las tareas
import { addTaskReq, getTasksReq, getTaskIdReq, updateTaskReq, deleteTaskReq } from "../API/tasks";


//Definimos el contexto de la tarea
const TaskContext = createContext();


//Declaramos un hook para usar el contexto de la tarea
export const useTaskContext = () => {
    

    //Declaramos una constante que contendrá el hook useContext con el contexto de la tarea (TaskContext)
    const context = useContext(TaskContext);

    //Si el hook useContext no tiene un contexto, lanzamos un error
    if (!context) {
        throw new Error("useTaskContext debe estar dentro del proveedor TaskProvider");
    }

    //Sino, retornamos el contexto
    return context;

}

export function TaskProvider({children}) {

    //Declaramos una constante que contendrá el hook useState para definir el estado de la tarea
    const [task, setTask] = useState([])
    
    

    const addTask = async (task) => {
        try {

            //Hacemos la petición a la API para registrar una tarea
            const res = await addTaskReq(task);
            setTask(res.data);

        
        } catch (errors) {
            console.log(errors);
        }
    };

    const getTasks = async () => {
        try {
            const res = await getTasksReq();
            setTask(res.data);
        } catch (errors) {
            console.log(errors);
        }
    };

    const getTaskId = async (id) => {
        try {
            const res = await getTaskIdReq(id);
            setTask(res.data);
        } catch (errors) {
            console.log(errors);
        }
    };

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskReq(id, task);
            setTask(res.data);
        } catch (errors) {
            console.log(errors);
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskReq(id);
            setTask(res.data);
        } catch (errors) {
            console.log(errors);
        }
    }




    //Retornamos el contexto de la tarea con el estado de la tarea y la función para modificarla
    return (
        <TaskContext.Provider value={{
            
            task,
            setTask,
            addTask,
            getTasks,
            getTaskId,
            updateTask,
            deleteTask

        }}>
            {children}
        </TaskContext.Provider>
    );

}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired
};