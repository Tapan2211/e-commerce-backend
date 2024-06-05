const router = require('express').Router();
const validateCityName = require('../middleware/city.middleware')

const {
    createCityName,
    getCityList,
    deleteCity
} = require('../controller/city.controller');

router.post('/new', validateCityName, createCityName);
router.get('/', getCityList);
router.delete('/:id', deleteCity)

module.exports = router;