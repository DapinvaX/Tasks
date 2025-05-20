# Gestión de Tareas - Documentación Técnica

## Índice
1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Componentes Principales](#componentes-principales)
3. [API y Servicios](#api-y-servicios)
4. [Seguridad](#seguridad)
5. [Diseño Responsive](#diseño-responsive)
6. [Guía de Desarrollo](#guía-de-desarrollo)

## Arquitectura del Sistema

### Frontend
- **Framework**: React con JavaScript
- **Estilos**: Tailwind CSS
- **Iconografía**: Lucide React
- **Estado Global**: Context API
- **Enrutamiento**: React Router DOM
- **Cliente HTTP**: Axios con interceptores personalizados

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT
- **Seguridad**: CSRF, CORS
- **Validación**: Zod

## Componentes Principales

### Autenticación (`AuthContext.jsx`)
- Gestión de estado de autenticación
- Verificación de tokens
- Persistencia de sesión
- Manejo automático de tokens CSRF

### Gestión de Temas (`ThemeContext.jsx`)
- Alternancia entre temas claro/oscuro
- Persistencia de preferencias
- Transiciones suaves

### Navegación Responsive (`Navbar.jsx`)
- Diseño adaptativo para múltiples dispositivos
- Menú hamburguesa para móviles
- Transiciones suaves
- Soporte para modo oscuro
- Breakpoints optimizados:
  - Móvil (< 768px)
  - Tablet (≥ 768px)
  - Desktop (≥ 1024px)

## API y Servicios

### Cliente HTTP (`api/axios.js`)
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

### Protección CSRF
1. **Configuración del Servidor**
   ```javascript
   const csrfProtection = csrf({
       cookie: {
           key: 'XSRF-TOKEN',
           httpOnly: false,
           sameSite: 'lax'
       }
   });
   ```

2. **Manejo en el Cliente**
   - Token automático en cookies
   - Interceptores Axios para requests
   - Renovación automática de tokens

### Medidas Adicionales
1. **CORS Configurado**
   ```javascript
   app.use(cors({
       origin: 'http://localhost:5173',
       credentials: true
   }));
   ```

2. **Autenticación JWT**
   - Tokens seguros
   - Almacenamiento en cookies httpOnly
   - Renovación automática

3. **Validación de Datos**
   - Esquemas Zod
   - Sanitización de entradas
   - Manejo de errores consistente

## Diseño Responsive

### Breakpoints
```css
sm: '640px'   // Móviles grandes
md: '768px'   // Tablets
lg: '1024px'  // Desktop
xl: '1280px'  // Desktop grande
```

### Características Responsive
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

3. **Seguridad**
   - Validar todas las entradas
   - Implementar CSRF en todas las rutas
   - Mantener dependencias actualizadas

4. **Mantenimiento**
   - Documentar componentes complejos
   - Mantener código limpio y organizado
   - Seguir principios SOLID

# Archivo obsoleto
Este archivo READMEAntiguo.md ha quedado obsoleto y puede ser eliminado.