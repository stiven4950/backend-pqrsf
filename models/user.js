const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    document_number: {
        type: Number,
        required: [true, '<document_number> is required'],
        unique: true
    },
    fullname: {
        type: String,
        required: [true, '<name> is required']
    },
    phone: {
        type: String,
        required: [true, '<name> is required']
    },
    email: {
        type: String,
        required: [true, '<email> is required'],
        unique: true
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );
