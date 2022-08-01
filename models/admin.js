const { Schema, model } = require('mongoose');

const AdminSchema = Schema({
    name: {
        type: String,
        required: [true, '<name> is required']
    },
    email: {
        type: String,
        required: [true, '<email> is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, '<password> is required'],
    },
    image: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    },
});

AdminSchema.methods.toJSON = function() {
    const { __v, password, _id, ...admin  } = this.toObject();
    admin.uid = _id;
    return admin;
}

module.exports = model( 'Admin', AdminSchema );
