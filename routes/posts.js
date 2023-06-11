import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getAll } from '../controllers/posts.js';

const router = new Router();

router.post('/', checkAuth, createPost);
router.get('/', checkAuth, getAll);


export default router;
