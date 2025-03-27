//Importamos zod
import { z } from "zod";

//Creamos el esquema de validación para las tasks
export const crearTaskSchema = z.object({
    //El título de la tarea debe ser un string y tener una longitud mínima de 3 y máxima de 50
    title: z
        .string({
        required_error: "Título: Este campo es obligatorio.",
        })
        .min(3)
        .max(50)/* .regex( /^[a-zA-Z0-9\s]*$/, {"message" : " El título solo puede contener letras y números."}) */,
    //La descripción de la tarea debe ser un string y tener una longitud mínima de 3 y máxima de 100
    description: z
        .string({
        required_error: "Descripción: Este campo es obligatorio.",
        })
        .min(3)
        .max(100)/* .regex( /^[a-zA-Z0-9\s]*$/, {"message" : " La descripción solo puede contener letras y números."}) */,
 
    });
