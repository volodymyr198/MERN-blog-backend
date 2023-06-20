import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    removeMyPost,
    updateMyPost,
    getPostComments,
} from '../controllers/posts.js';

const router = new Router();

router.post('/', checkAuth, createPost);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/user/me', checkAuth, getMyPosts);
router.delete('/:id', checkAuth, removeMyPost);
router.put('/:id', checkAuth, updateMyPost);
router.get('/comments/:id', getPostComments);

export default router;
