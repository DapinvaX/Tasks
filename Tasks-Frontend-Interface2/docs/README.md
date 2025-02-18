# Gestión de Tareas - Documentación

## Índice
1. [Guía de Usuario](#guía-de-usuario)
   - [Introducción](#introducción)
   - [Características Principales](#características-principales)
   - [Cómo Usar la Aplicación](#cómo-usar-la-aplicación)
2. [Guía del Desarrollador](#guía-del-desarrollador)
   - [Estructura del Proyecto](#estructura-del-proyecto)
   - [Tecnologías Utilizadas](#tecnologías-utilizadas)
   - [Componentes Principales](#componentes-principales)
   - [API y Servicios](#api-y-servicios)
   - [Estilos y Temas](#estilos-y-temas)
   - [Buenas Prácticas](#buenas-prácticas)

## Guía de Usuario

### Introducción
Gestión de Tareas es una aplicación web moderna que permite organizar y gestionar tareas diarias de manera eficiente. Con una interfaz intuitiva y adaptable, los usuarios pueden crear, editar y realizar un seguimiento de sus tareas desde cualquier dispositivo.

### Características Principales
- **Tema Claro/Oscuro**: Personalización de la apariencia con cambio dinámico de tema
- **Gestión Completa de Tareas**: Crear, editar, marcar como completadas y eliminar tareas
- **Autenticación Segura**: Sistema robusto de registro e inicio de sesión
- **Interfaz Responsiva**: Diseño adaptable para dispositivos móviles y de escritorio
- **Navegación Intuitiva**: Barra de navegación central con acceso rápido a todas las funciones

### Cómo Usar la Aplicación

#### 1. Inicio de Sesión y Registro
- **Registro de Usuario**:
  - Accede al botón "Registrarse"
  - Completa el formulario con nombre, email y contraseña
  - El sistema te redirigirá automáticamente tras el registro exitoso

- **Inicio de Sesión**:
  - Usa el botón "Iniciar sesión"
  - Ingresa tu email y contraseña
  - Accederás directamente a tu perfil tras la autenticación

#### 2. Navegación
- **Barra Superior**:
  - Logo y título "Gestión de Tareas" en el centro (enlace a inicio)
  - Botón de tema claro/oscuro
  - Menú de navegación con accesos principales
  - Botón de cerrar sesión para usuarios autenticados

#### 3. Gestión de Tareas
- **Visualización de Tareas**:
  - Accede desde el botón "Tareas" en la navegación
  - Lista ordenada de todas tus tareas
  - Indicador visual de estado (completada/pendiente)

- **Crear Nueva Tarea**:
  - Usa el botón "Nueva Tarea"
  - Completa el formulario con:
    - Título de la tarea
    - Descripción detallada
    - Estado de completado
  - Guarda los cambios

- **Editar Tareas**:
  - Haz clic en el icono de lápiz
  - Modifica los campos necesarios
  - Guarda los cambios

- **Eliminar Tareas**:
  - Usa el icono de papelera
  - Confirma la eliminación en el diálogo

#### 4. Personalización
- **Cambio de Tema**:
  - Alterna entre tema claro y oscuro con el botón sol/luna
  - La preferencia se guarda automáticamente
  - Afecta a toda la interfaz de usuario

## Guía del Desarrollador

### Estructura del Proyecto
```
src/
├── api/                # Servicios y llamadas API
│   ├── auth.ts        # Autenticación
│   ├── axios.ts       # Configuración de Axios
│   └── tasks.ts       # Operaciones CRUD de tareas
├── components/        # Componentes reutilizables
│   ├── Navbar.tsx    # Barra de navegación
│   ├── TaskCard.tsx  # Tarjeta de tarea
│   └── ProtectedRoute.tsx # Rutas protegidas
├── context/          # Contextos de React
│   ├── AuthContext.tsx   # Estado de autenticación
│   └── ThemeContext.tsx  # Gestión del tema
├── pages/            # Páginas de la aplicación
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── TasksPage.tsx
│   ├── AddTaskPage.tsx
│   └── NotFoundPage.tsx
├── types/           # Definiciones de TypeScript
└── main.tsx        # Punto de entrada
```

### Tecnologías Utilizadas
- **Frontend**:
  - React 18 con TypeScript
  - React Router DOM para navegación
  - Tailwind CSS para estilos
  - Lucide React para iconografía
  - Axios para peticiones HTTP

### Componentes Principales

#### 1. Sistema de Autenticación
```typescript
// context/AuthContext.tsx
- Gestión del estado de autenticación
- Almacenamiento del usuario actual
- Verificación de estado autenticado
```

#### 2. Sistema de Temas
```typescript
// context/ThemeContext.tsx
- Alternancia entre temas claro/oscuro
- Persistencia en localStorage
- Aplicación automática de clases CSS
```

#### 3. Gestión de Tareas
```typescript
// components/TaskCard.tsx
- Visualización de detalles de tarea
- Funcionalidad de edición inline
- Confirmación de eliminación
```

### API y Servicios

#### Configuración de Axios
```typescript
// api/axios.ts
- Instancia personalizada de Axios
- Configuración de base URL
- Manejo de credenciales
```

#### Autenticación
```typescript
// api/auth.ts
- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Verificación de token
```

#### Gestión de Tareas
```typescript
// api/tasks.ts
- CRUD completo de tareas
- Tipado fuerte con TypeScript
- Manejo de errores
```

### Estilos y Temas

#### Sistema de Temas
- Implementación con Tailwind Dark Mode
- Transiciones suaves entre temas
- Clases consistentes para modo oscuro

#### Diseño Responsivo
- Breakpoints para diferentes dispositivos
- Layouts flexibles con Flexbox/Grid
- Optimización móvil

### Buenas Prácticas

#### 1. Seguridad
- Rutas protegidas para contenido autenticado
- Manejo seguro de tokens
- Validación de formularios

#### 2. Rendimiento
- Carga perezosa de componentes
- Optimización de re-renders
- Gestión eficiente de estado

#### 3. Mantenibilidad
- Estructura modular del código
- Tipado estricto con TypeScript
- Documentación inline

#### 4. Experiencia de Usuario
- Feedback visual para acciones
- Mensajes de error claros
- Transiciones suaves

### Mantenimiento y Desarrollo

#### Añadir Nuevas Características
1. Crear componentes en carpeta apropiada
2. Actualizar tipos si es necesario
3. Implementar lógica de negocio
4. Integrar con sistema de temas
5. Actualizar documentación

#### Testing
1. Implementar pruebas unitarias
2. Verificar funcionalidad en ambos temas
3. Probar en diferentes dispositivos
4. Validar flujos de usuario