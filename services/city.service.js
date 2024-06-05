const cityModel = require('../models/city.model');

const createCityDoc = async (cityname) => {
    const city = await cityModel(cityname);
    console.log("City_123", city);
    const result = await city.save();
    return result;
}

const getAllCityDoc = async () => {
    const city = await cityModel.find({});
    return city;
}

const deleteCityDoc = async (id) => {
    const cityName = await cityModel.findOneAndDelete(id);
    return cityName;
}

module.exports = {
    createCityDoc,
    getAllCityDoc,
    deleteCityDoc
}