import express from 'express';
import morgan from 'morgan';
import cnx from './db.js';
import 'dotenv/config';

// Importamos las rutas de autenticación
import authRoutes from './routes/auth.routes.js';

//Importamos las rutas de tareas
import taskRoutes from './routes/task.routes.js';

// Importamos cookie-parser
import cookieParser from 'cookie-parser';

//Importamos CORS
import cors from 'cors';

// Inicializar conexión a la base de datos
cnx();

// Inicialización de express
const app = express();

// Middleware
app.use(morgan('dev'));

// Convierte los request body a json para que el servidor entienda los datos que se envían desde el cliente
app.use(express.json());

// Convierte las cookies a un objeto para que el servidor entienda los datos que se envían desde el cliente
app.use(cookieParser());


// Habilitamos CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL,
        'https://vercel.com/dapinvaxs-projects/tasks-frontend/3e2N1oPJzqrwgmxEjJ54FABtykwf'
      ] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(cors(corsOptions));

// Rutas
//Establecemos la ruta base para las rutas de autenticación "/api"
app.use("/api",authRoutes);


//Establecemos la ruta base para las rutas de tareas "/api" para  todos los taksroutes
app.use("/api",taskRoutes);

// Exportamos app para poder utilizarlo en otros archivos
export default app;