import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const createPost = async (req, res, next) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            });

            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            });

            return res.json(newPostWithImage);
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        });

        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        });

        return res.json(newPostWithoutImage);
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        const popularPosts = await Post.find().limit(5).sort('-vievs');

        if (!posts) {
            return res.json({ message: 'There are no posts!' });
        }

        res.json({ posts, popularPosts });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });

        res.json(post);
    } catch (error) {
        next(error);
    }
};

export const getMyPosts = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const posts = await Promise.all(user.posts.map(post => {
            return Post.findById(post._id)
        }))

        res.json(posts);
    } catch (error) {
        next(error);
    }
};