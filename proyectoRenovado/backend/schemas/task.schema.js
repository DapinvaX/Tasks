import { z } from 'zod';

export const crearTaskSchema = z.object({
  title: z.string({
    required_error: 'El título es requerido'
  }).min(3, {
    message: 'El título debe tener al menos 3 caracteres'
  }),
  description: z.string({
    required_error: 'La descripción es requerida'
  }).min(10, {
    message: 'La descripción debe tener al menos 10 caracteres'
  }),
  completed: z.boolean().default(false)
});

export const updateTaskSchema = z.object({
  title: z.string().min(3, {
    message: 'El título debe tener al menos 3 caracteres'
  }).optional(),
  description: z.string().min(10, {
    message: 'La descripción debe tener al menos 10 caracteres'
  }).optional(),
  completed: z.boolean().optional()
});