const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Admin = require('../models/admin');
const { generateJWT } = require('../helpers');

const adminPost = async (req, res = response) => {

    const { name, email, password } = req.body;
    const admin = new Admin({ name, email, password });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);

    // Save in BD
    await admin.save();

    // Generate el JWT
    const token = await generateJWT(admin.id);

    res.json({
        admin,
        token
    });
}

const adminPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, ...others } = req.body;

    if (password) {
        // Encrypting password
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync(password, salt);
    }

    const admin = await Admin.findByIdAndUpdate(id, others, { new: true });

    res.json(admin);
}

const adminPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - adminPatch'
    });
}

const adminDelete = async (req, res = response) => {

    const { id } = req.params;
    const admin = await Admin.findByIdAndUpdate(id, { state: false });

    res.json(admin);
}

module.exports = {
    adminPost,
    adminPut,
    adminPatch,
    adminDelete,
}