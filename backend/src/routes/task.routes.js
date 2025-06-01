//Importamos router desde express
import { Router } from 'express';

//Importamos el middleware de autenticación
import { authRequired } from '../middlewares/validateToken.js';

//Importamos el middleware de validación de esquemas
import {
    validateSchema
} from '../middlewares/validateMiddleware.js';

//Importamos las rutas
import { 
    obtenerTaks, 
    obtenerTaskID, 
    crearTask, 
    modificarTask, 
    eliminarTask } from '../controllers/tasks.controller.js';

//Importamos el esquema de validación para crear las tasks
import { crearTaskSchema } from '../schemas/task.schema.js';


//Inicializamos router
const router = Router();


//CRUD de tareas

//Definimos las rutas
//A estas riuas solo se puede acceder si se está autenticado


//Obtener todas las tareas de un usuario
router.get('/tasks', authRequired, obtenerTaks,() =>{

});

//Obtener una tarea por id de un usuario
router.get('/tasks/:id', authRequired, obtenerTaskID, () =>{});

//Crear una tarea
router.post('/tasks', authRequired, crearTask, validateSchema(crearTaskSchema));

//Actualizar/Modificar una tarea
router.put('/tasks/:id', authRequired, modificarTask);

//Eliminar una tarea
router.delete('/tasks/:id', authRequired, eliminarTask);

//Exportamos router
export default router;