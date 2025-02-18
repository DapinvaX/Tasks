import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email requerido.'
    }),
    password: z.string({
        required_error: 'Contraseña requerida.'
    })
});

export const registerSchema = z.object({
    
    //El nombre debe contener solo letras
    name: z.string({
        required_error: 'Nombre requerido.'
    }).regex(/^[a-zA-Z]+$/, {
        invalid_error: 'El nombre solo puede contener letras.'
    }),
    
    //El apellido debe contener solo letras
    lastname: z.string({
        required_error: 'Apellido/s requeridos.'
    }).regex(/^[a-zA-Z]+$/, {
        invalid_error: 'El apellido no puede contener números.'
    }),

    username: z.string({
        required_error: 'Nombre de usuario requerido.'
    }).regex(/^[a-zA-Z0-9]+$/),

    //El email debe contener un @ y un punto
    email: z.string({
        required_error: 'Email requerido.'
    }).regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    
    //La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial
    password: z.string({
        required_error: 'Contraseña requerida.'
    }). regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    passwordConfirmation: z.string({
        required_error: 'Confirmación de contraseña requerida.',
        invalid_error: 'Las contraseñas no coinciden.'
    })
});