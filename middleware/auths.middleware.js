const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    password: Joi.string().min(3).max(12).required()
});

const validatorSearchQuery = (req, res, next) => {
    const { name, email, number, address, gender, password } = req.body;
    const { error } = schema.validate({ name, email, number, address, gender, password });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validatorSearchQuery;
