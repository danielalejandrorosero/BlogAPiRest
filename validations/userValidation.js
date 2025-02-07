import Joi from 'joi';

const userValidation = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        age: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        isAdmin: Joi.boolean()
    });

    return schema.validate(user);
};

export default userValidation;