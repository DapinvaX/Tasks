import dotenv from 'dotenv';

// Cargamos las variables de entorno desde el archivo .env
dotenv.config();

//Guardamos el TOKEN_SECRET en una variable para poder exportarlo y usarlo en otros archivos
export const TOKEN_SECRET = process.env.TOKEN_SECRET;