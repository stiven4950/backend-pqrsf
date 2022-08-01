const Role = require('../models/role');
const { User, City, Matter } = require('../models');

const isRoleValid = async (rol = 'USER_ROLE') => {

    const existsRol = await Role.findOne({ rol });
    if (!existsRol) {
        throw new Error(`Rol ${rol} does not exists in bd`);
    }
}

const emailExists = async (email = '') => {

    // Verify if email exists
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`The email: ${email}, is already registered`);
    }
}

const existsUserById = async (id) => {

    // Verify if user exists by Id
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`Id does not exists ${id}`);
    }
}

/**
 * Validate allowed collections
 */
const allowedCollections = (collection = '', collections = []) => {

    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`Collection ${collection} is not allowed, ${collections}`);
    }
    return true;
}


module.exports = {
    isRoleValid,
    emailExists,
    existsUserById,
    allowedCollections,
}

