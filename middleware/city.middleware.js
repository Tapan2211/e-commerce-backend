const Joi = require('joi');

const schema = Joi.object({
    cityname: Joi.string().required(),
});

const validateCityName = (req, res, next) => {
    const { cityname } = req.body;
    const { error } = schema.validate({ cityname });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateCityName;