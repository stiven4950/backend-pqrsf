const { response, request } = require('express');

const User = require('../models/user');

const getUserById = async (req = request, res = response) => {

    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
}

const usersGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    const users = await User.find().skip(Number(desde)).limit(Number(limit));

    res.json(users);
}

const usersPost = async (req, res = response) => {
    const { document_number, fullname, phone, email } = req.body;
    const user = new User({ document_number, fullname, phone, email });
    await user.save();

    res.json(user);
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, ...others } = req.body;

    const user = await User.findByIdAndUpdate(id, others, { new: true });

    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id);

    res.json(user);
}

module.exports = {
    getUserById,
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}