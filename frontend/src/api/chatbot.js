// Chatbot local con respuestas usando switch/case
export function getBotResponse(message) {
  const msg = message.toLowerCase();
  switch (true) {
    case /registrar|crear cuenta/.test(msg):
      return 'Para registrarte, haz clic en "Registrarse" en la barra superior y completa el formulario.';
    case /iniciar sesi[óo]n|login/.test(msg):
      return 'Haz clic en "Iniciar sesión" e ingresa tus credenciales para acceder a tus tareas.';
    case /tarea.*(crear|nueva)/.test(msg) || /(crear|nueva).*tarea/.test(msg):
      return 'Para crear una tarea, ve a la página de tareas y pulsa el botón "+" o "Agregar tarea".';
    case /editar.*tarea/.test(msg):
      return 'Haz clic en una tarea existente y luego en "Editar" para modificarla.';
    case /eliminar.*tarea/.test(msg):
      return 'Para eliminar una tarea, haz clic en el icono de papelera junto a la tarea que deseas borrar.';
    case /tema|oscuro|claro/.test(msg):
      return 'Puedes cambiar entre modo claro y oscuro usando el botón de tema en la barra superior.';
    case /logout|cerrar sesi[óo]n/.test(msg):
      return 'Para cerrar sesión, haz clic en tu usuario en la barra superior y selecciona "Cerrar sesión".';
    case /error/.test(msg):
      return 'Si encuentras un error, intenta recargar la página o revisa tu conexión. Si el problema persiste, contacta al soporte.';
    case /presentaci[óo]n|documentaci[óo]n/.test(msg):
      return 'Puedes encontrar la documentación y presentación en la sección "docs" del proyecto.';
    case /proteger|privacidad/.test(msg):
      return 'Tus datos están protegidos mediante autenticación JWT y cookies seguras.';
    case /contrase[ñn]a.*(olvid[ée]|recuperar)/.test(msg):
      return 'Si olvidaste tu contraseña, actualmente debes contactar al administrador para restablecerla.';
    case /notificaciones?/.test(msg):
      return 'Por ahora la app no envía notificaciones push, pero puedes ver tus tareas pendientes al iniciar sesión.';
    case /filtrar.*tareas?/.test(msg):
      return 'Puedes filtrar tareas usando las opciones de búsqueda o los filtros disponibles en la página de tareas.';
    case /ordenar.*tareas?/.test(msg):
      return 'Las tareas se pueden ordenar por fecha de creación o estado desde la vista de tareas.';
    case /colaborar|compartir/.test(msg):
      return 'Actualmente la app es de uso individual, pero puedes exportar tus tareas manualmente si lo necesitas.';
    case /soporte|ayuda/.test(msg):
      return 'Si necesitas soporte adicional, revisa la documentación o contacta al desarrollador.';
    case /api|backend/.test(msg):
      return 'La API está documentada en el archivo thunder-collection_Task API.json y en la carpeta docs.';
    case /frontend|interfaz/.test(msg):
      return 'El frontend está construido con React y Tailwind. Puedes personalizarlo editando los componentes en la carpeta src/components.';
    case /seguridad/.test(msg):
      return 'La seguridad se maneja con JWT, validación de datos y protección de rutas privadas.';
    case /actualizar.*tarea/.test(msg):
      return 'Para actualizar una tarea, haz clic en ella y luego edita los campos necesarios antes de guardar.';
    case /borrar cuenta|eliminar cuenta/.test(msg):
      return 'Para eliminar tu cuenta, contacta al administrador del sistema.';
    case /idioma/.test(msg):
      return 'Actualmente la aplicación solo está disponible en español.';
    default:
      return 'No entiendo tu pregunta. ¿Puedes reformularla o ser más específico?';
  }
}
