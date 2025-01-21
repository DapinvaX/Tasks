# Gestión de Tareas - Documentación

## Índice
1. [Guía de Usuario](#guía-de-usuario)
2. [Guía del Desarrollador](#guía-del-desarrollador)

## Guía de Usuario

### Introducción
Gestión de Tareas es una aplicación web que te permite organizar y gestionar tus tareas diarias de manera eficiente. Con una interfaz intuitiva y moderna, podrás crear, editar y realizar un seguimiento de tus tareas fácilmente.

### Características Principales
- **Tema Claro/Oscuro**: Personaliza la apariencia de la aplicación según tus preferencias
- **Gestión de Tareas**: Crea, edita y elimina tareas
- **Autenticación**: Sistema seguro de registro e inicio de sesión
- **Interfaz Responsiva**: Funciona en dispositivos móviles y de escritorio

### Cómo Usar la Aplicación

#### 1. Inicio de Sesión y Registro
- Haz clic en "Registrarse" para crear una nueva cuenta
- Si ya tienes una cuenta, usa "Iniciar sesión"
- Ingresa tu correo electrónico y contraseña

#### 2. Navegación
- **Barra de Navegación**:
  - Logo y título central que te lleva a la página principal
  - Botón de cambio de tema (sol/luna)
  - Enlaces a diferentes secciones
  - Botón de cerrar sesión

#### 3. Gestión de Tareas
- **Ver Tareas**: Accede a través del botón "Tareas" en la navegación
- **Crear Tarea**: Usa el botón "Nueva Tarea"
- **Editar Tarea**: 
  - Haz clic en el icono de lápiz
  - Modifica título, descripción o estado
  - Guarda los cambios
- **Eliminar Tarea**: Usa el icono de papelera

#### 4. Personalización
- **Cambiar Tema**:
  - Haz clic en el icono de sol/luna en la barra de navegación
  - El tema se guardará para futuras visitas

## Guía del Desarrollador

### Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── context/            # Contextos de React
├── pages/              # Páginas de la aplicación
├── api/                # Servicios y llamadas API
├── types/              # Definiciones de TypeScript
└── main.tsx           # Punto de entrada
```

### Tecnologías Utilizadas
- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router DOM
  - Lucide React (iconos)

### Componentes Principales

#### 1. Sistema de Temas
```typescript
// context/ThemeContext.tsx
- Gestiona el tema claro/oscuro
- Usa localStorage para persistencia
- Proporciona hook useTheme()
```

#### 2. Autenticación
```typescript
// context/AuthContext.tsx
- Maneja el estado de autenticación
- Proporciona hook useAuth()
- Gestiona sesiones de usuario
```

#### 3. Navegación
```typescript
// components/Navbar.tsx
- Barra de navegación responsive
- Integración con sistema de temas
- Manejo de autenticación
```

### Estilos y Temas

#### Configuración de Tailwind
```javascript
// tailwind.config.js
- darkMode: 'class' para temas
- Contenido configurado para archivos React
```

#### Clases de Tema
- Uso de prefijo `dark:` para estilos oscuros
- Transiciones suaves con `transition-colors`
- Sistema de colores consistente

### Buenas Prácticas Implementadas

1. **Tipado Fuerte**
   - Interfaces TypeScript para todos los modelos
   - Props tipadas en componentes

2. **Componentes Reutilizables**
   - Separación de responsabilidades
   - Props bien definidas
   - Documentación inline

3. **Gestión de Estado**
   - Uso de Context API
   - Estados locales cuando es apropiado
   - Persistencia en localStorage

4. **Seguridad**
   - Rutas protegidas
   - Validación de formularios
   - Manejo seguro de autenticación

### Mantenimiento y Desarrollo

#### Añadir Nuevas Características
1. Crear componentes en `src/components`
2. Definir tipos en `src/types`
3. Implementar lógica de negocio
4. Integrar con el sistema de temas

#### Modificar Temas
1. Actualizar `tailwind.config.js`
2. Añadir clases dark: en componentes
3. Probar en ambos temas

### Despliegue
1. Construir la aplicación: `npm run build`
2. Verificar la build en `/dist`
3. Desplegar en el servidor