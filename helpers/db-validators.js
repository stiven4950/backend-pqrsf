const { Admin } = require('../models');

const emailExists = async (email = '') => {

    // Verify if email exists
    const existsEmail = await Admin.findOne({ email });
    if (existsEmail) {
        throw new Error(`The email: ${email}, is already registered`);
    }
}

const existsAdminById = async( id ) => {
    const existsAdmin = await Admin.findById(id);
    if ( !existsAdmin ) {
        throw new Error(`Id does not exists ${ id }`);
    }
}

const allowedCollections = (collection = '', collections = []) => {

    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`Collection ${collection} is not allowed, ${collections}`);
    }
    return true;
}

module.exports = {
    emailExists,
    allowedCollections,
}

