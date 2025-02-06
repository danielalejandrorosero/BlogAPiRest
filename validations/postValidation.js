import Joi from 'joi';

// Validación para el post
function postValidation(post) {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        authorId: Joi.number().integer()
    });

    return schema.validate(post);
}

// Validación para el comentario
function commentValidation(comment) {
    const schema = Joi.object({
        content: Joi.string(),
        postId: Joi.number().integer(),
        authorId: Joi.number().integer()
    });

    return schema.validate(comment);
}

export default { postValidation, commentValidation };
