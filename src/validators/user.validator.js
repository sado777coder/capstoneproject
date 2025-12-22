const Joi = require("joi");

// validate signin
const signinValidation = Joi.object({
        name : Joi.string().min(2).required(true),
        email : Joi.string().email().required(true),
        role : Joi.string().default("customer"),
        password : Joi.string().required(true),
        isActive : Joi.boolean().default(true)
    });

    // validate login
    const loginValidation = Joi.object({
            email : Joi.string().email().required(true),
            password : Joi.string().required(true),
        });
        
        // export signinSchema and loginSchema
        module.exports = {
            signinValidation,
            loginValidation,
        };
