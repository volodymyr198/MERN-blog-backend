import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res
                .status(409)
                .json({ message: 'This user is already busy!' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        });

        await newUser.save();

        res.status(201).json({
            newUser,
            message: 'Registration was successful!',
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res,next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Such a user does not exist' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({ token, user, message: 'You are logged in' });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Such a user does not exist' });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({ token, user });
    } catch (error) {
        next(error);
    }
};
