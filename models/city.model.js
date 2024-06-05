const { required } = require('joi');
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    cityname: { type: String, required: true },
})

const cityModel = mongoose.model('cityname', citySchema);
module.exports = cityModel;