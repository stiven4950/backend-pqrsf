const { Schema, model } = require('mongoose');

const CitySchema = Schema({
    cod: {
        type: String,
        required: [true, '<cod> is required'],
        unique: true,
        maxlength: 5,
    },
    name: {
        type: String,
        required: [true, '<name> is required'],
        unique: true,
        maxlength: 250,
    },
});

CitySchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('City', CitySchema);
