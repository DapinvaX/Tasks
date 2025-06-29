# 🚀 Guía de Despliegue y Depuración - Tasks App

## 📝 Resumen de Cambios Realizados

### ✅ Correcciones Implementadas

1. **Unificación de Configuración de API**
   - Eliminé la configuración duplicada en `auth.js`
   - Ahora todos los archivos usan la misma instancia de axios desde `axios.js`
   - Configuración centralizada con variables de entorno

2. **Mejorado el Sistema de Logs**
   - Agregados interceptors en axios para logging automático
   - Logs detallados de peticiones y respuestas
   - Mejores mensajes de error

3. **Configuración de CORS Actualizada**
   - Removida la URL incorrecta del dashboard de Vercel
   - Agregado soporte para preflight requests
   - Headers adicionales para mejor compatibilidad

4. **Herramientas de Depuración**
   - Nuevo archivo `utils/debug.js` con funciones de testing
   - Botón de debug en la página de login
   - Tests automáticos de conectividad

5. **Configuración de Vercel Optimizada**
   - `vercel.json` actualizado con configuración moderna
   - Timeout aumentado para mejor rendimiento

## 🔧 Instrucciones de Configuración

### 1. Variables de Entorno

**Frontend (.env.production):**
```bash
VITE_API_URL=https://tu-backend-vercel.vercel.app/api
```

**Backend (Variables en Vercel):**
```bash
FRONTEND_URL=https://tu-frontend-vercel.vercel.app
NODE_ENV=production
DB_HOST=tu-host-de-bd
DB_USER=tu-usuario-bd
DB_PASSWORD=tu-password-bd
DB_NAME=tu-nombre-bd
JWT_SECRET=tu-secreto-jwt
```

### 2. URLs a Configurar

**⚠️ IMPORTANTE:** Debes reemplazar las siguientes URLs con las reales:

1. En `backend/src/app.js` línea ~35:
   ```javascript
   'https://tasks-frontend-kappa-seven.vercel.app' // ← Cambiar por tu URL real
   ```

2. En `frontend/.env.production`:
   ```bash
   VITE_API_URL=https://tu-backend-real.vercel.app/api
   ```

### 3. Cómo Obtener las URLs Correctas

1. **Frontend en Vercel:**
   - Ve a tu dashboard de Vercel
   - Selecciona tu proyecto frontend
   - Copia la URL que aparece en "Domains" (ej: `https://tasks-frontend-abc123.vercel.app`)

2. **Backend en Vercel:**
   - Ve a tu dashboard de Vercel
   - Selecciona tu proyecto backend
   - Copia la URL que aparece en "Domains" (ej: `https://tasks-backend-xyz789.vercel.app`)

## 🧪 Cómo Usar las Herramientas de Debug

### 1. En el Frontend

1. Ve a la página de login
2. Haz clic en "Mostrar Herramientas de Debug"
3. Haz clic en "Probar Conectividad con Backend"
4. Abre la consola del navegador (F12) para ver los resultados

### 2. Tests que se Ejecutan

- **Test de Backend:** Verifica si el backend responde
- **Test de Login:** Verifica si el endpoint de login está accesible
- **Test de Tasks:** Verifica si el endpoint de tareas está accesible

### 3. Interpretación de Resultados

- ✅ **Verde:** Todo funciona correctamente
- ❌ **Rojo:** Hay un problema que necesita solución

## 🐛 Diagnóstico de Problemas Comunes

### Problema: "Error de red"
**Solución:**
1. Verifica que la URL del backend sea correcta
2. Confirma que el backend esté desplegado y funcionando
3. Revisa la configuración de CORS

### Problema: "CORS Error"
**Solución:**
1. Asegúrate de que la URL del frontend esté en la configuración de CORS del backend
2. Verifica que uses la URL pública real, no la del dashboard

### Problema: "401 Unauthorized"
**Solución:**
1. Esto es normal para endpoints protegidos sin login
2. Si ocurre después del login, revisa la configuración de cookies

### Problema: "Timeout"
**Solución:**
1. Los servicios gratuitos pueden ser lentos en el primer arranque
2. Espera unos segundos y vuelve a intentar

## 📋 Checklist de Despliegue

### Antes de Desplegar:

- [ ] ✅ Variables de entorno configuradas correctamente
- [ ] ✅ URLs reales (no de dashboard) en configuración de CORS
- [ ] ✅ Frontend apunta al backend correcto
- [ ] ✅ Backend incluye frontend en CORS

### Después de Desplegar:

- [ ] 🧪 Ejecutar tests de conectividad
- [ ] 🔐 Probar proceso de login
- [ ] 📋 Probar carga de tareas
- [ ] 🌐 Verificar en diferentes navegadores

## 🔍 Logs Importantes a Revisar

### En el Frontend (Consola del Navegador):
```
🚀 Petición a: https://tu-backend.vercel.app/api/login
✅ Respuesta exitosa de: /login
```

### En el Backend (Logs de Vercel):
```
2024-01-01T12:00:00.000Z - POST /api/login
Origin: https://tu-frontend.vercel.app
```

## 🆘 Próximos Pasos si Persisten los Problemas

1. **Ejecuta las herramientas de debug** desde la página de login
2. **Copia los logs de la consola** y compártelos
3. **Verifica las URLs** en las configuraciones
4. **Revisa los logs de Vercel** tanto del frontend como del backend

---

💡 **Tip:** Los servicios gratuitos de Vercel pueden tardar ~10-15 segundos en arrancar si no han recibido tráfico recientemente. Esto es normal.
