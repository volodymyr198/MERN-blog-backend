import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import  {checkAuth}  from '../utils/checkAuth.js';
import { validate } from '../utils/validation.js';
import { registerLoginSchema } from '../schemas/users/registerLoginSchema.js';

const router = new Router();

router.post('/register', validate(registerLoginSchema), register);

router.post('/login', validate(registerLoginSchema), login);

router.get('/me', checkAuth, getMe);

export default router;
