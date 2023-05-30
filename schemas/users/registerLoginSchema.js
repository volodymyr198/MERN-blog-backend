import Joi from "joi";

export const registerLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
        .min(6)
        .max(16)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
        .required()
        .messages({
            'string.pattern.base':
                'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
        }),
});
