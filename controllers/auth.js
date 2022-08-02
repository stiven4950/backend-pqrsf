const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Admin = require('../models/admin');

const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verify if email exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - <email>'
            });
        }

        // If User is active
        if (!admin.state) {
            return res.status(400).json({
                msg: 'User / Password are incorrect state: false'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - <password>'
            });
        }

        // Generar el JWT
        const token = await generateJWT(admin.id);

        res.json({
            admin,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Consult with admin'
        });
    }

}

const loginUID = async (req, res = response) => {

    const { uid, password } = req.body;

    try {
        // Verify if email exists
        const admin = await Admin.findById(uid);
        if (!admin) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - <email>'
            });
        }

        // If User is active
        if (!admin.state) {
            return res.status(400).json({
                msg: 'User / Password are incorrect state: false'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - <password>'
            });
        }

        // Generar el JWT
        const token = await generateJWT(admin.id);

        res.json({
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Consult with admin'
        });
    }

}

const validateTokenUser = async (req, res = response) => {

    // Generate JWT
    const token = await generateJWT(req.user._id);

    res.json({
        user: req.user,
        token: token,
    })

}

module.exports = {
    login,
    loginUID,
    validateTokenUser,
}
