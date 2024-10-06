# Proyecto Final

Author: @DapinvaX
### By Daniel Pintado Várez

## Backend

### Dependencias
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JsonWebToken)
- Bcrypt

### Guía para el Programador
1. **Instalación de Dependencias**:
    ```bash
    npm install
    ```
2. **Configuración del Entorno**:
    - Crear un archivo `.env` con las siguientes variables:
        ```
        PORT=5000
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
- React Router
- Redux
- Redux Thunk

### Guía para el Programador
1. **Instalación de Dependencias**:
    ```bash
    npm install
    ```
2. **Configuración del Entorno**:
    - Crear un archivo `.env` con las siguientes variables:
        ```
        REACT_APP_API_URL=http://localhost:5000/api
        ```
3. **Ejecución de la Aplicación**:
    ```bash
    npm start
    ```

### Guía para el Usuario
- **Navegación**: Utilizar la barra de navegación para acceder a las diferentes secciones de la aplicación.
- **Gestión de Tareas**: Crear, editar y eliminar tareas desde la interfaz de usuario.
- **Autenticación**: Registrarse e iniciar sesión para acceder a las funcionalidades protegidas.

## Frontend

### Dependencias

