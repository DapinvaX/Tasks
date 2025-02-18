import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js';
import { auth } from '../middlewares/auth.middleware.js';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks.controller.js';

const router = Router();

// Todas las rutas requieren autenticación
router.use(auth);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', validateSchema(createTaskSchema), createTask);
router.put('/:id', validateSchema(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;