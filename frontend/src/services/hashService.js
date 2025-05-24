/**
 * Servicio para hashear contraseñas de forma consistente
 * Usa SHA-256 para crear un hash de la contraseña
 */
export const hashPassword = async (password) => {
  // Convertir la contraseña a un objeto ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Crear hash usando SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convertir el ArrayBuffer a string hexadecimal
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};
