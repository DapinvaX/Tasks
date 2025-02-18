import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { register, login, logout, verifyToken } from '../controllers/auth.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/auth/verify', auth, verifyToken);

export default router;