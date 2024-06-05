const { required } = require('joi');
const validator = require('validator');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    productImage: {
        type: String, required: true,
        validate: {
            validator: (value) => {
                // Validator function to check if the value is a valid URL or file path
                return validator.isURL(value) || /^\/uploads\//.test(value);
            },
            message: 'Invalid URL or file path'
        }
    },
    color: {
        type: [String],
    },
    productPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productColor: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const productModel = mongoose.model('Product', productSchema);  // Ensure correct model name 'Product'
module.exports = productModel;  // Export the model directly
