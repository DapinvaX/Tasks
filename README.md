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

### Guía para el Usuario
- **Registro**: Enviar una solicitud POST a `/api/register` con los datos del usuario.
- **Inicio de Sesión**: Enviar una solicitud POST a `/api/login` con las credenciales del usuario.
- **Operaciones CRUD**: Utilizar los endpoints `/api/tasks` para crear, leer, actualizar y eliminar tareas.

## Frontend

### Dependencias
- React
- Axios
- CSURF (Cross-Site Request Forgery)
- React Router
- Redux
- Redux Thunk
## Actualización del Frontend

### Dependencias y Librerías Utilizadas

- React: Librería para construir interfaces de usuario.
- Axios: Cliente HTTP para realizar peticiones.
- CSURF: Protección contra ataques de falsificación de solicitudes.
- React Router: Manejo de rutas en la aplicación.
- Redux: Gestión del estado global.
- Redux Thunk: Middleware para acciones asíncronas en Redux.
- Lucide: Librería de componentes para iconos
- React Toastify: Librería para notificaciones en React

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

## Cambios Recientes
- Se optimizó el Navbar para mejorar las transiciones y la experiencia en dispositivos móviles.
- Se ajustaron estilos y se mejoró el comportamiento del toggle de modo oscuro.
- Se actualizaron las animaciones y sombras en botones y enlaces para una interacción más fluida.



