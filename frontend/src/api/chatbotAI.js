// Servicio para obtener respuesta de un bot externo (OpenAI API)
// Debes tener una API key válida y configurarla en el backend o variable de entorno segura

export async function fetchBotResponse(message) {
  // Ejemplo usando la API de OpenAI (modelo gpt-3.5-turbo)
  // Reemplaza 'TU_API_KEY' por tu clave real o usa un proxy seguro
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Eres un asistente para una aplicación de gestión de tareas. Responde de forma breve, clara y útil sobre el funcionamiento de la app, registro, tareas, seguridad, temas, errores, etc.' },
      { role: 'user', content: message }
    ],
    max_tokens: 120,
    temperature: 0.3
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error('Error al conectar con el bot');
  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'No se pudo obtener respuesta del bot.';
}
