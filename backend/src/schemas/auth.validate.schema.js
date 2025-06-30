//Importamos la libreria que acabamos de instalar
//Zod es una librería de validación de esquemas que nos permite validar los datos que se envían desde el cliente
import {z} from 'zod';

// Regex para usuario y contraseña (ahora permite @ en usuario)
const SAFE_USER_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ _@-]*$/;
const SAFE_TEXT_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ _-]*$/;
// Regex para email: permite letras, números, guion bajo, guion y arroba
const SAFE_EMAIL_REGEX = /^[a-zA-Z0-9._@-]+$/;

//Creamos el esquema de validación para el registro de usuarios
export const registerSchema = z.object({

    //El usuario debe ser un string y tener una longitud mínima de 2 y máxima de 50
    
    user: z.string(
        
        {
            required_error: "Usuario: Este campo es obligatorio."
        }

    ).min(3).max(50)
    .regex(SAFE_USER_REGEX, {
        message: "El usuario solo puede contener letras, números, espacios, guion bajo (_), guion (-) y arroba (@)."
    }),


    //El email debe ser un string y estar en formato email
    email: z.string(
        
        {
        required_error : "Email: Este campo es obligatorio."
    },
    //console.info("Este campo es obligatorio.")
)
    .email(

        //console.error("Por favor, introduzca un email válido."),
        {
        message: "Por favor, introduzca un email válido."
    }
)
    .min(5)
    .max(100)
    .regex(SAFE_EMAIL_REGEX, {
        message: "El email solo puede contener letras, números, guion bajo (_), guion (-), punto (.) y arroba (@)."
    }),

    //La contraseña debe ser un string y tener una longitud mínima de 6 y máxima de 20 y contener al menos un número, una minúscula y una mayúscula
    //Explicación de la expresión regular:
    // ^: Desde el inicio de la cadena
    // (?=.*\d): Al menos un número
    // (?=.*[a-z]): Al menos una minúscula
    // (?=.*[A-Z]): Al menos una mayúscula
    // .{6,20}: De 6 a 20 caracteres
    // Evitar los caracteres "-", "<", ">" y "$" en la contraseña
    // $: Hasta el fin de la cadena

    password: z.string(
        
        {
        required_error : "Contraseña: Este campo es obligatorio. Por favor, introduzca una contraseña válida."
    })
    .min(6)
    .max(20)
    .regex(SAFE_TEXT_REGEX, {
        message: "La contraseña no puede contener caracteres especiales."
    }),
});

//Creamos el esquema de validación para el login de usuarios

export const loginSchema = z.object({

    //El email debe ser un string y estar en formato email
    user: z.string(
        
        {
            required_error: "Usuario: Este campo es obligatorio."
        }

    ).min(3)
    .regex(SAFE_USER_REGEX, {
        message: "El usuario solo puede contener letras, números, espacios, guion bajo (_), guion (-) y arroba (@)."
    }),


    //La contraseña debe ser un string y tener una longitud mínima de 6 y máxima de 20 y contener al menos un número, 
    // una minúscula, una mayúscula y no contener caracteres especiales. 
  

    password: z.string(
        {
        required_error : "Contraseña: Este campo es obligatorio. Por favor, introduzca una contraseña válida."
    }

)
    .min(6)
    .max(20)
    .regex(SAFE_TEXT_REGEX, {
        message: "La contraseña no puede contener caracteres especiales."
    }),
});