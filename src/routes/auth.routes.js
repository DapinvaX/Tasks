import { Router } from 'express';
import {login, logout, register} from '../controllers/auth.controller.js';

// Declaramos el router para manejar las rutas de autenticación
const router = Router();

// Definimos las rutas de autenticación con sus respectivos controladores
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

// Exportamos el router para poder utilizarlo en otros archivos
export default router;