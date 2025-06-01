//Importamos router desde express
import { Router } from 'express';

//Importamos el middleware de autenticación
import { authRequired } from '../middlewares/validateToken.js';

/* import csrf from 'csurf'; */
import csrf from 'csurf';

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
router.get('/tasks', authRequired, obtenerTaks,(req, res) =>{

    

});

//Obtener una tarea por id de un usuario
router.get('/tasks/:id', authRequired, obtenerTaskID, () =>{});

//Crear una tarea
router.post('/tasks', authRequired, crearTask, validateSchema(crearTaskSchema), (req, res, next) =>{
    res.cookie('XSRF-TOKEN' );
    next();
});

//Actualizar/Modificar una tarea
router.put('/tasks/:id', authRequired, modificarTask, ( res, next) =>{
    res.cookie('XSRF-TOKEN');
    next();
});

//Eliminar una tarea
router.delete('/tasks/:id', authRequired, eliminarTask, ( res, next) =>{
    res.cookie('XSRF-TOKEN');
    next(); 
});

//Exportamos router
export default router;