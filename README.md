# Proyecto Final

Author: @DapinvaX
### By Daniel Pintado Várez

## Backend

### Dependencias
- Node.js
- Express
- MongoDB
- Mongoose
- Morgan
- JWT (JsonWebToken)
- Bcrypt
- Cookie Parser
- CSURF (Cross-Site Request Forgery)

### Guía para el Programador
1. **Instalación de Dependencias**:
    ```bash
    npm install
    ```
2. **Configuración del Entorno**:
    - Crear un archivo `.env` con las siguientes variables:
        ```
        PORT=5173
        MONGO_URI=your_mongo_uri
        JWT_SECRET=your_jwt_secret
        ```
3. **Ejecución del Servidor**:
    ```bash
    npm start
    ```

### Arquitectura Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT
- **Seguridad**: CSRF, CORS
- **Validación**: Zod

### Middleware de Validación
- Esquemas Zod para validación estructurada
- Sanitización de entradas
- Manejo de errores consistente

### Seguridad Implementada
#### Protección CSRF
```javascript
const csrfProtection = csrf({
    cookie: {
        key: 'XSRF-TOKEN',
        httpOnly: false,
        sameSite: 'lax'
    }
});
```

#### CORS Configurado
```javascript
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
```

#### Autenticación JWT
- Tokens seguros
- Almacenamiento en cookies httpOnly
- Renovación automática

### Guía para el Usuario
- **Registro**: Enviar una solicitud POST a `/api/register` con los datos del usuario.
- **Inicio de Sesión**: Enviar una solicitud POST a `/api/login` con las credenciales del usuario.
- **Operaciones CRUD**: Utilizar los endpoints `/api/tasks` para crear, leer, actualizar y eliminar tareas.

## Frontend

### Arquitectura Frontend
- **Framework**: React con JavaScript
- **Estilos**: Tailwind CSS
- **Iconografía**: Lucide React
- **Estado Global**: Context API
- **Enrutamiento**: React Router DOM
- **Cliente HTTP**: Axios con interceptores personalizados

### Estructura de Carpetas
```
src/
├── api/          # Servicios y llamadas API
├── components/   # Componentes reutilizables
├── context/     # Contextos globales
└── pages/       # Componentes de página
```

### Dependencias y Librerías Utilizadas
- React: Librería para construir interfaces de usuario.
- Axios: Cliente HTTP para realizar peticiones.
- CSURF: Protección contra ataques de falsificación de solicitudes.
- React Router: Manejo de rutas en la aplicación.
- Redux: Gestión del estado global.
- Redux Thunk: Middleware para acciones asíncronas en Redux.
- Lucide: Librería de componentes para iconos
- React Toastify: Librería para notificaciones en React

### Componentes Principales

#### Autenticación (`AuthContext.jsx`)
- Gestión de estado de autenticación
- Verificación de tokens
- Persistencia de sesión
- Manejo automático de tokens CSRF

#### Sistema de Temas (`ThemeContext.jsx`)
- Alternancia entre temas claro/oscuro
- Persistencia de preferencias en localStorage
- Detección automática de preferencias del sistema
- Transiciones suaves entre temas

#### Navegación Responsive (`Navbar.jsx`)
- Diseño adaptativo para múltiples dispositivos
- Menú hamburguesa para móviles
- Transiciones suaves
- Soporte para modo oscuro
- Breakpoints optimizados:
  - Móvil (< 768px)
  - Tablet (≥ 768px)
  - Desktop (≥ 1024px)

### API y Servicios

#### Cliente HTTP
```javascript
// Configuración base
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// Interceptores para CSRF
instance.interceptors.request.use(config => {
    // Añadir token CSRF
});

instance.interceptors.response.use(
    response => response,
    error => {
        // Manejar errores y renovar token CSRF
    }
);
```

#### Autenticación
```javascript
register(credentials)    // Registro de usuarios
login(credentials)      // Inicio de sesión
logout()               // Cierre de sesión
verifyToken()          // Verificación de token
```

#### Gestión de Tareas
```javascript
fetchUserTasks()       // Obtener todas las tareas
getTaskById(id)        // Obtener tarea específica
addTaskReq(task)       // Crear nueva tarea
updateTaskReq(id, task) // Actualizar tarea
deleteTaskReq(id)      // Eliminar tarea
```

### Diseño Responsive

#### Breakpoints
```css
sm: '640px'   // Móviles grandes
md: '768px'   // Tablets
lg: '1024px'  // Desktop
xl: '1280px'  // Desktop grande
```

#### Características Responsive
1. **Navegación**
   - Menú hamburguesa en móvil
   - Navegación horizontal en desktop
   - Transiciones suaves

2. **Contenido**
   - Layouts fluidos
   - Imágenes responsivas
   - Tipografía adaptativa

3. **Interacciones**
   - Touch-friendly en móvil
   - Hover states en desktop
   - Feedback visual consistente

### Convenciones de Código
1. **Nombrado**
   - PascalCase para componentes
   - camelCase para funciones y variables
   - UPPER_CASE para constantes

2. **Organización**
   - Un componente por archivo
   - Imports agrupados por tipo
   - Exports nombrados preferidos

3. **Estilos**
   - Clases Tailwind organizadas por categoría
   - Preferir utilidades sobre CSS personalizado
   - Mantener consistencia en espaciado

### Guía para el Programador
1. **Instalación de Dependencias**:
    ```bash
    npm install
    ```
2. **Configuración del Entorno**:
    - Crear un archivo `.env` con las siguientes variables:
        ```
        REACT_APP_API_URL=http://localhost:4000/api
        ```
3. **Ejecución de la Aplicación**:
    ```bash
    npm start
    ```

### Guía para el Usuario
- **Navegación**: Utilizar la barra de navegación para acceder a las diferentes secciones de la aplicación.
- **Gestión de Tareas**: Crear, editar y eliminar tareas desde la interfaz de usuario.
- **Autenticación**: Registrarse e iniciar sesión para acceder a las funcionalidades protegidas.

### Servicio de Hasheado
El servicio de hasheado (hashService.js) para el frontend utiliza la API Web Crypto para generar un hash SHA-256 de las contraseñas de forma asincrónica.  
El resultado es una cadena hexadecimal que representa el hash de la contraseña.  
Se recomienda emplear este servicio junto con medidas de seguridad en el backend para proteger la autenticidad y confidencialidad de las contraseñas.

### Mejores Prácticas
1. **Rendimiento**
   - Usar React.memo para componentes pesados
   - Implementar lazy loading
   - Optimizar re-renders

2. **Accesibilidad**
   - Mantener estructura semántica
   - Incluir atributos ARIA
   - Asegurar contraste de colores

3. **Seguridad**
   - Validar todas las entradas
   - Implementar CSRF en todas las rutas
   - Mantener dependencias actualizadas

4. **Mantenimiento**
   - Documentar componentes complejos
   - Mantener código limpio y organizado
   - Seguir principios SOLID

## Cambios Recientes
- Se optimizó el Navbar para mejorar las transiciones y la experiencia en dispositivos móviles.
- Se ajustaron estilos y se mejoró el comportamiento del toggle de modo oscuro.
- Se actualizaron las animaciones y sombras en botones y enlaces para una interacción más fluida.



