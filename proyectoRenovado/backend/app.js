import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Configuración de CSRF
const csrfProtection = csrf({
    cookie: {
        key: 'XSRF-TOKEN',
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    }
});

// Rutas que no necesitan CSRF
app.post('/api/login', authRoutes);
app.post('/api/register', authRoutes);

// Middleware CSRF para el resto de rutas
app.use(csrfProtection);

// Ruta para obtener el token CSRF
app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;