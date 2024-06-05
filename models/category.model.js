const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, unique: true, required: true },
    categoryImage: {
        type: String, required: true,
        validate: {
            validator: (value) => {
                // Validator function to check if the value is a valid URL or file path
                return validator.isURL(value) || /^\/uploads\//.test(value);
            },
            message: 'Invalid URL or file path'
        }
    }
});

const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;
