import { createContext, useContext, useState } from "react";
import {
    getTasksReq, //Todas las tareas
    getTaskIdReq, //Una tarea (por id)
    addTaskReq, //Agregar una tarea
    deleteTaskReq, //Eliminar una tarea
    updateTaskReq, //Actualizar una tarea
} from "../api/tasks";

const TaskContext = createContext();

// Creamos un Hook para acceder al contexto de tareas
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {

  //Usamos un estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);

  //Funciones para interactuar con la API de tareas

  //Obtener todas las tareas
  const getTasks = async () => {
    const res = await getTasksReq();
    setTasks(res.data);
  };

  //Obtener una tarea por su ID
  // (usado para editar una tarea)
  const getTask = async (id) => {
    try {
      const res = await getTaskIdReq(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  //Crear una tarea
  const createTask = async (task) => {
    try {
      const res = await addTaskReq(task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar una tarea
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskReq(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizar/Editamos una tarea
  const updateTask = async (id, task) => {
    try {
      await updateTaskReq(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  //Retornamos el contexto con las tareas y las funciones
  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
      }}
    >

      
      {
      // Pasamos las tareas y las funciones a los componentes hijos  
      children
      }

    </TaskContext.Provider>
  );
}