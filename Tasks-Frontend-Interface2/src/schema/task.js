import {z} from 'zod';

export const TaskSchema = z.object({
    title : z.string({
        required_error: 'Título requerido.'
    }),
    description : z.string({
        required_error: 'Descripción requerida.'
    }),
    status : z.enum(['pending', 'completed'], {

    }),

});