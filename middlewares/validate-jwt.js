const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in request'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // read user with unique UID
        const user = await User.findById( uid );

        if( !user ) {
            return res.status(401).json({
                msg: 'Invalid Token - User does not exists in BD'
            })
        }

        // Verify if UID state is true
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Invalid Token - User with state = false'
            })
        }
        
        req.user = user;
        next();

    } catch (error) {

        // console.log(error);
        res.status(401).json({
            msg: 'Invalid Token'
        })
    }

}

module.exports = {
    validateJWT
}