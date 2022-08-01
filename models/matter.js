const { Schema, model } = require('mongoose');

const MatterSchema = Schema({
    matter_type: {
        type: String,
        required: [true, '<type> is required'],
        unique: false,
        maxlength: 1,
    },
    name: {
        type: String,
        required: [true, '<name> is required'],
        unique: true,
        maxlength: 250,
    },
});

MatterSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Matter', MatterSchema);
