const { number, required } = require("joi");
const validator = require('validator');
const { default: mongoose } = require("mongoose");

const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        maxLength: 50,
        required: true,
        validate: (value) => validator.isEmail(value)
    },
    number: { type: Number, required: true },
    address: { type: String },
    gender: { type: String },
    password: { type: String, required: true }
})

registrationSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

const registrationModel = mongoose.model('e-commerce', registrationSchema);
module.exports = registrationModel;