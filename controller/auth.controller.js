const {
    registrationDoc,
    loginDoc,
    getAllUserDoc,
    userDeleteByIdDoc
} = require('../services/auth.service');

const registration = async (req, res) => {
    try {
        const { name, email, number, address, gender, password } = req.body;
        const data = await registrationDoc(name, email, number, address, gender, password);
        return res.status(200).json({ message: 'Registration successfully', data });
    } catch (error) {
        return res.status(400).json({ message: 'Error creating user', error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginDoc(email, password);
        res.status(200).json({ message: 'Login successful', user, token });

    } catch (error) {
        return res.status(400).json({ message: 'Invalid email or password', error })
    }
}

const getAllUser = async (req, res) => {
    try {

        const user = await getAllUserDoc();
        return res.status(200).json(user);

    } catch (error) {
        return res.status(400).json({ message: 'oops! something went wrong', error })
    }
}

const deleteUser = async (req, res) => {
    try {

        const userID = req.params.id;
        const result = await userDeleteByIdDoc(userID)
        return res.status(200).json({ message: 'Successfully delete', result });

    } catch (error) {
        return res.status(400).json({ message: 'oops! something went wrong', error })
    }
}


module.exports = {
    registration,
    login,
    getAllUser,
    deleteUser
}