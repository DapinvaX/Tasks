// Importamos el modelo de tareas
import Task from "../models/task.model.js";

//Creamos las funciones que se ejecutarán en cada ruta

//Obtener todas las tareas
export const obtenerTaks = async (req, res) => {
   
  try {
       
    
        //Obtenemos todas las tareas
        const tasks = await Task.find({
          //Buscamos las tareas que pertenezcan al usuario autenticado
          user: req.user.id,
        }).populate("user");
    
        //Si no hay tareas
        if (!tasks) {
          //Devuelve un mensaje de que no hay tareas
          return res.status(404).json({ message: "No hay tareas" });
        }
    
        //Sino, me devuelves las tareas por consola y en formato JSON
        console.log("Tareas: " + tasks);
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

//Obtener una tarea por id
export const obtenerTaskID = async (req, res) => {
  //Obtenemos el id de la tarea
  const { id } = req.params;

  //Buscamos la tarea por id
  const task = await Task.findById(id).populate("user");

  //Si la tarea no existe
  if (!task) {
    return res.status(404).json({ message: `La tarea con id ${id} no existe` });
  }

  //Si la tarea existe, la enviamos en formato JSON
  console.log(task);
  res.status(200).json(task);
};

//Crear una tarea
export const crearTask = async (req, res) => {
  // Extraer los datos de la tarea
  const { title, description, done, createDate } = req.body;

  //Obtenemos el usuario autenticado
  const user = req.user;

 //Obtenemos el nombre del usuario autenticado
  const username = req.username;

  console.log("**Usuario**: ", username);
  
  //Mostramos por consola los datos que vienen del req.user
  console.log("Datos Usuario: "+ JSON.stringify(user, null, 2));

  // Crear la tarea
  const newTask = new Task({
     
    title,
    description,
    createDate,
    done,
    user : user.id,
    
  });

  // Guardar la tarea en la base de datos
  const taskSaved = await newTask.save();

  

  // Imprimir por consola y enviar la tarea guardada en formato JSON
  console.log(taskSaved, "Tarea guardada!");
  res.status(201).json(taskSaved);
};

//Actualizar/Modificar una tarea
export const modificarTask = async (req, res) => {


  //Obtenemos el id de la tarea a modificar y la actualizamos con el metodo findByIdAndUpdate
  //y le pasamos el id de la tarea, los datos a modificar y el objeto {new:true} para que nos devuelva la tarea actualizada
  //(si no le pasamos el objeto {new:true} nos devolverá la tarea antes de ser actualizada)
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //Para que nos devuelva la tarea actualizada
    new: true,
  }).populate("user");

  //Si la tarea no existe
  if (!task) {
    //Devuelve un mensaje de que la tarea no existe
    console, log(`La tarea con id ${req.params.id} no existe`);
    return res
      .status(404)
      .json({ message: `La tarea con id ${req.params.id} no existe` });
  } else {
    //Si la tarea existe, mostramos un mensaje de que ha sido actualizada y la tarea actualizada
    //Primero por consola y luego en formato JSON
    console.log(`La tarea con id ${req.params.id} ha sido actualizada`);
    console.log(task);
    res.status(200).json({ message: "La tarea ha sido modificada/actualizada", task });
  }
}; 

//Eliminar una tarea
export const eliminarTask = async (req, res) => {
  //Obtenemos el id de la tarea a eliminar
  const { id } = req.params;

  //Buscamos la tarea por id y la eliminamos con el metodo findOneAndDelete y le pasamos el id
  const task = await Task.findByIdAndDelete(id)
                                  /* .populate("user") */;

  //Si no encontró la tarea
  if (!task) {
    return res.status(404).json({
      message: "Tarea no encontrada.",
    });
  }
  //Sino, me devuelves la tarea que ha sido eliminada y un mensaje de que ha sido eliminada satisfactoriamente
  console.log(
    "La tarea con ID " + task + " ha sido eliminada satisfactoriamente."
  );
  res.status(200).json({
    message: "Tarea eliminada satisfactoriamente.",
  });
};
