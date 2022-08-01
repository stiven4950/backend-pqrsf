const { Schema, model } = require('mongoose');

const CitySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        maxlength: 250,
    },
});

CitySchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('City', CitySchema);
