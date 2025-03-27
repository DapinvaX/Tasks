import express from 'express';
import morgan from 'morgan';

// Importamos las rutas de autenticación
import authRoutes from './routes/auth.routes.js';

//Importamos las rutas de tareas
import taskRoutes from './routes/task.routes.js';

// Importamos cookie-parser
import cookieParser from 'cookie-parser';

//Importamos CORS
import cors from 'cors';



//Importamos CSRF
/* import csrf from 'csurf'; */ 



// Inicialización de express
const app = express();

// Middleware
app.use(morgan('dev'));

// Convierte los request body a json para que el servidor entienda los datos que se envían desde el cliente
app.use(express.json());

// Convierte las cookies a un objeto para que el servidor entienda los datos que se envían desde el cliente
app.use(cookieParser());

// Middleware de protección CSRF
/* const csrfProtection = csrf({ cookie: false });
app.use(csrfProtection); 
 */

// Habilitamos CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Rutas
//Establecemos la ruta base para las rutas de autenticación "/api"
app.use("/api",authRoutes);


// Ruta para obtener el token CSRF
/* app.get('/api/csrf-token', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json({ csrfToken: req.csrfToken() });
  }); */
 


//Establecemos la ruta base para las rutas de tareas "/api" para  todos los taksroutes
app.use("/api",taskRoutes);

// Exportamos app para poder utilizarlo en otros archivos
export default app;