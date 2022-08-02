const { Schema, model } = require('mongoose');

const FillingSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        unique: false,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    matter: {
        type: Schema.Types.ObjectId,
        ref: 'Matter',
        required: true,
    },
    medium: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: [true, '<description> is required'],
        maxlength: 2000,
    },
    filling_date: {
        type: Date,
        default: Date.now
    },
    user_type: {
        type: String,
        required: [true, '<user_type> is required'],
        maxlength: 1,
    },
    ticket: {
        type: String,
        maxlength: 17
    },
    state: {
        type: String,
        maxlength: 15,
        default: 'SIN REVISAR',
    },
    files: {
        type: Array,
        data: String,
        default: [],
    },
    response_date : {
        type: Date,
        required: false,
    },
});

FillingSchema.methods.toJSON = function() {
    const { __v, password, _id, ...filling  } = this.toObject();
    filling.uid = _id;
    return filling;
}

module.exports = model( 'Filling', FillingSchema );
