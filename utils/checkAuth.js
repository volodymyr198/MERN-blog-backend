import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded.id;

            next();
        } catch (error) {
            next(createError(401, 'Not authorized'));
        }
    } else {
        next(createError(401, 'Not authorized'));
    }
};
