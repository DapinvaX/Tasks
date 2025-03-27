//Importamos router desde express
import { Router } from 'express';

//Importamos el middleware de autenticación
import { authRequired } from '../middlewares/validateToken.js';

//Importamos el middleware de protección CSRF
//import csrf from 'csurf';

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


//Importamos el middleware de protección CSRF
//const csrfProtection = csrf({ cookie: true });


//Inicializamos router
const router = Router();

// Usamos csrfProtection
//router.use(csrfProtection);


//CRUD de tareas


//Definimos las rutas
//A estas riuas solo se puede acceder si se está autenticado


//Obtener todas las tareas de un usuario
router.get('/tasks', authRequired, obtenerTaks,(req, res) =>{

    

});

//Obtener una tarea por id de un usuario
router.get('/tasks/:id', authRequired, obtenerTaskID, (req, res) =>{});

//Crear una tarea
router.post('/tasks', authRequired, crearTask, validateSchema(crearTaskSchema), (req, res) =>{
    //res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

//Actualizar/Modificar una tarea
router.put('/tasks/:id', authRequired, modificarTask, (req, res) =>{
    //res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

//Eliminar una tarea
router.delete('/tasks/:id', authRequired, eliminarTask, (req, res) =>{
    //res.cookie('XSRF-TOKEN', req.csrfToken());
    next(); 
});

//Exportamos router
export default router;