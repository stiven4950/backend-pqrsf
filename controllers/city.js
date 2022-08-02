const { response } = require('express');
const { City } = require('../models');

const citiesGet = async (req, res = response) => {

    const cities = await City.find().populate('name');

    res.json(cities);
}

const cityCreate = async (req, res = response) => {

    const { data } = req.body;

    for (i in data) {
        const city = new City(i);
        await city.save();
    }

    res.status(201).json({
        'msg': 'ok'
    });
}

module.exports = {
    cityCreate,
    citiesGet,
}