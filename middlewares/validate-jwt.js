const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in request'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // read admin with unique UID
        const admin = await Admin.findById( uid );

        if( !admin ) {
            return res.status(401).json({
                msg: 'Invalid Token - User does not exists in BD'
            })
        }

        // Verify if UID state is true
        if ( !admin.state ) {
            return res.status(401).json({
                msg: 'Invalid Token - User with state = false'
            })
        }
        
        req.admin = admin;
        next();

    } catch (error) {

        // console.log(error);
        res.status(401).json({
            msg: 'Invalid Token'
        });
    }

}

module.exports = {
    validateJWT
}