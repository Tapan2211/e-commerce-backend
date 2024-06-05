const router = require('express').Router();
const {
    registration,
    login,
    getAllUser,
    deleteUser
} = require('../controller/auth.controller');
const validatorSearchQuery = require('../middleware/auths.middleware');

router.post('/registration', validatorSearchQuery, registration);
router.post('/login', login);
router.get('/', getAllUser);
router.delete('/:id', deleteUser);

module.exports = router;