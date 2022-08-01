const { response } = require('express')


const isAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Verifying role without validate token first'
        });
    }

    const { rol, name } = req.user;
    
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not admin - You do not do this`
        });
    }

    next();
}


const hasRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Verifying role without validate token first'
            });
        }

        if ( !roles.includes( req.user.rol ) ) {
            return res.status(401).json({
                msg: `Service require one of this roles: ${ roles }`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}