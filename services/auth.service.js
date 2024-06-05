const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RegistrationModel = require('../models/auth.model');

const registrationDoc = async (name, email, number, address, gender, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const isEmailTaken = await RegistrationModel.isEmailTaken(email);
    if (isEmailTaken) {
        throw new Error('Email is already in database');
    }

    const registration = new RegistrationModel({ name, email, number, address, gender, password: hashPassword });
    const result = await registration.save();
    return result;
};

const loginDoc = async (email, password) => {
    const user = await RegistrationModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    return { user, token }
}

const getAllUserDoc = async (req, res) => {
    const result = await RegistrationModel.find({});
    return result;
}

const userDeleteByIdDoc = async (id) => {
    const result = await RegistrationModel.findOneAndDelete({ _id: id })
    return result;
}

module.exports = {
    registrationDoc,
    loginDoc,
    getAllUserDoc,
    userDeleteByIdDoc
};