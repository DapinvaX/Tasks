/**
 * Servicio de hasheado para contraseñas en el frontend.
 *
 * Este servicio utiliza la API Web Crypto para generar un hash SHA-256 de la contraseña.
 * La función hashPassword es asíncrona y devuelve el hash en formato hexadecimal.
 *
 * Función:
 *   - hashPassword(password): Recibe una cadena (la contraseña) y retorna una Promise
 *     que resuelve con el hash.
 *
 * Nota: Realizar el hasheado en el frontend no garantiza la seguridad total.
 * Se recomienda utilizar este hash en conjunto con estrategias de seguridad en el backend.
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
