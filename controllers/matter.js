const { response } = require('express');
const { Matter } = require('../models');

const mattersGet = async (req, res = response) => {

    const [total, matters] = await Promise.all([
        Matter.find()
            .populate('name'),
    ]);

    res.json({
        total,
        matters
    });
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
}