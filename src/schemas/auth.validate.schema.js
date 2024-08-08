//Importamos la libreria que acabamos de instalar
import {z} from 'zod';

//Creamos el esquema de validación para el registro de usuarios
export const registerSchema = z.object({

    //El usuario debe ser un string y tener una longitud mínima de 2 y máxima de 50
    
    user: z.string(
        
        {
            required_error: "Usuario: Este campo es obligatorio."
        }

    ).min(3).max(50),
    /* .regex(/^[^-<>$]$/,
        
        { 
        
        required_error: "Los caracteres especiales no están permitidos en el nombre."
    }) */


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
    /* .regex(/^[<>$-]$/,
        //console.error("Los caracteres especiales no están permitidos en el email."),
        {

        message: "Los caracteres especiales no están permitidos en el email."

    }) */,

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
    /* .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}[^-<>$]*$/,
        
        
        {
        
        required_error : "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número. Los caracteres especiales no están permitidos."
    
    }) */,
});

//Creamos el esquema de validación para el login de usuarios

export const loginSchema = z.object({

    //El email debe ser un string y estar en formato email
    user: z.string(
        
        {
            required_error: "Usuario: Este campo es obligatorio."
        }

    ).min(3).max(50),


    //La contraseña debe ser un string y tener una longitud mínima de 6 y máxima de 20 y contener al menos un número, 
    // una minúscula, una mayúscula y no contener caracteres especiales. 
  

    password: z.string(
        {
        required_error : "Contraseña: Este campo es obligatorio. Por favor, introduzca una contraseña válida."
    }

)
    /* .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}[^-<>$]*$/,{
        
        required_error : "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.Los caracteres especiales no están permitidos."
    
    }) */,
});