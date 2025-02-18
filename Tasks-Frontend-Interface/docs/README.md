# Gestión de Tareas - Documentación Técnica

## Índice
1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Componentes Principales](#componentes-principales)
3. [API y Servicios](#api-y-servicios)
4. [Seguridad](#seguridad)
5. [Guía de Desarrollo](#guía-de-desarrollo)

## Arquitectura del Sistema

### Frontend
- **Framework**: React con JavaScript
- **Estilos**: Tailwind CSS
- **Iconografía**: Lucide React
- **Estado Global**: Context API
- **Enrutamiento**: React Router DOM
- **Cliente HTTP**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT
- **Validación**: Zod

## Componentes Principales

### Autenticación (`AuthContext.jsx`)
- Gestión de estado de autenticación
- Verificación de tokens
- Persistencia de sesión

### Gestión de Temas (`ThemeContext.jsx`)
- Alternancia entre temas claro/oscuro
- Persistencia de preferencias
- Transiciones suaves

### Componentes de UI
- **Navbar**: Navegación principal y controles de usuario
- **TaskCard**: Visualización y edición de tareas
- **ProtectedRoute**: Control de acceso a rutas privadas

## API y Servicios

### Autenticación (`api/auth.js`)
```javascript
register(credentials)    // Registro de usuarios
login(credentials)      // Inicio de sesión
logout()               // Cierre de sesión
verifyToken()          // Verificación de token
```

### Gestión de Tareas (`api/tasks.js`)
```javascript
fetchUserTasks()       // Obtener todas las tareas
getTaskById(id)        // Obtener tarea específica
addTaskReq(task)       // Crear nueva tarea
updateTaskReq(id, task) // Actualizar tarea
deleteTaskReq(id)      // Eliminar tarea
```

## Seguridad

### Medidas Implementadas
1. **Autenticación JWT**
   - Tokens seguros
   - Renovación automática
   - Almacenamiento en cookies httpOnly

2. **Protección de Rutas**
   - Middleware de autenticación
   - Validación de permisos
   - Redirección automática

3. **Validación de Datos**
   - Esquemas Zod
   - Sanitización de entradas
   - Manejo de errores consistente

## Guía de Desarrollo

### Estructura de Carpetas
```
src/
├── api/          # Servicios y llamadas API
├── components/   # Componentes reutilizables
├── context/     # Contextos globales
└── pages/       # Componentes de página
```

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

### Flujo de Trabajo
1. **Desarrollo Local**
   ```bash
   npm install    # Instalar dependencias
   npm run dev    # Iniciar servidor de desarrollo
   ```

2. **Construcción**
   ```bash
   npm run build  # Generar build de producción
   ```

### Mejores Prácticas
1. **Rendimiento**
   - Usar React.memo para componentes pesados
   - Implementar lazy loading
   - Optimizar re-renders

2. **Accesibilidad**
   - Mantener estructura semántica
   - Incluir atributos ARIA
   - Asegurar contraste de colores

3. **Mantenimiento**
   - Documentar componentes complejos
   - Mantener código limpio y organizado
   - Seguir principios SOLID