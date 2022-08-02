const { response } = require('express');
const { Matter } = require('../models');

const mattersGet = async (req, res = response) => {

    const matters = await Matter.find().populate('name');

    res.json(matters);
}

const mattersGetByType = async (req, res = response) => {

    const { matter_type } = req.params;

    const matters = await Matter.find({ matter_type });

    res.json(matters);
}

const matterCreate = async (req, res = response) => {

    const { data } = req.body;

    for (i in data) {
        const matter = new Matter(i);
        await matter.save();
    }

    res.status(201).json({
        'msg': 'ok'
    });
}

module.exports = {
    matterCreate,
    mattersGet,
    mattersGetByType,
}