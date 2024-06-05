const {
    createCityDoc,
    getAllCityDoc,
    deleteCityDoc
} = require('../services/city.service');

const createCityName = async (req, res) => {
    try {
        const { cityname } = req.body;
        console.log("cityname", cityname)
        const data = await createCityDoc(req.body);
        console.log("cityname123", data)
        res.status(200).json({ message: 'Cityname create  successfully', data });

    } catch (error) {
        return res.status(400).json({ message: 'Error creating cityname', error })
    }
}

const getCityList = async (req, res) => {
    try {
        const city = await getAllCityDoc();
        if (!city || city.length === 0) {
            return res.status(400).json({ message: 'No record found' })
        }
        return res.status(200).json(city);
    } catch (error) {
        return res.status(400).json({ message: 'Find problem fetching city list', error: error.message })
    }
}

const deleteCity = async (req, res) => {
    try {
        const cityId = req.params.id;
        const deleteCity = await deleteCityDoc(cityId)
        return res.status(200).json({ message: 'Cityname delete successfully', deleteCity });
    } catch (error) {
        return res.status(400).json({ message: 'Could not delete cityname', error });
    }
}

module.exports = {
    createCityName,
    getCityList,
    deleteCity
}