const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
      
        // Verify if email exists
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - <email>'
            });
        }

        // If User is active
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect state: false'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - <password>'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Consult with admin'
        });
    }   

}

const validateTokenUser = async (req, res = response ) => {

    // Generate JWT
    const token = await generateJWT( req.user._id );
    
    res.json({
        user: req.user,
        token: token,
    })

}

module.exports = {
    login,
    validateTokenUser,
}
