import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getAll, getById } from '../controllers/posts.js';

const router = new Router();

router.post('/', checkAuth, createPost);
router.get('/', getAll);
router.get('/:id', getById);


export default router;
