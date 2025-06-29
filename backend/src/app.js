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
  origin: function (origin, callback) {
    // Permitir solicitudes sin origin (como Postman) en desarrollo
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Lista de orígenes permitidos
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [
          process.env.FRONTEND_URL,
          'https://tasks-frontend-blue.vercel.app', // Tu URL real de Vercel
          'https://tasks-frontend-blue.vercel.app/', // Con slash final por si acaso
        ] 
      : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4000'];
    
    // Verificar si el origin está permitido
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('❌ CORS bloqueado para origin:', origin);
      console.log('✅ Orígenes permitidos:', allowedOrigins);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware de depuración para CORS
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.headers['user-agent']);
  next();
});

// Middleware para manejar preflight requests explícitamente
app.options('*', (req, res) => {
  console.log('Preflight request received for:', req.path);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Rutas
// Endpoint de prueba para verificar conectividad
app.get('/api/test', (req, res) => {
  console.log('🧪 Endpoint de prueba accedido');
  res.json({
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors_origin: req.headers.origin,
    deployment_version: '2.0'
  });
});

//Establecemos la ruta base para las rutas de autenticación "/api"
app.use("/api",authRoutes);


//Establecemos la ruta base para las rutas de tareas "/api" para  todos los taksroutes
app.use("/api",taskRoutes);

// Exportamos app para poder utilizarlo en otros archivos
export default app;