const { response } = require('express');
const { Filling, User } = require('../models');
const { generateTicketNumber } = require('../utils/utils');

const fillingsGet = async (req, res = response) => {

    const fillings = await Filling.find();

    res.json({
        fillings
    });
}

const getFillingByTicketNumber = async (req, res = response) => {

    const { ticket } = req.params;
    const filling = await Filling.findOne({ticket: ticket});

    res.json(filling);

}

const createFillingIdentifiedUser = async (req, res = response) => {
    const { document_number,  ...body } = req.body;
    const user = await User.findOne({document_number:document_number});

    if(!user) {
        const { fullname, phone, email, } = req.body;
        user = new User({
            document_number: document_number,
            fullname: fullname,
            phone: phone,
            email: email,
        });

        await user.save();
    }

    const filling = new Filling({
        user: user._id,
        ticket: generateTicketNumber(),
        user_type: 'I',
        ...body,
    });
    await filling.save();

    res.status(201).json(filling);
}

const createFillingAnonimousUser = async (req, res = response) => {
    const { body } = req.body;
    
    const filling = new Filling({
        ticket: generateTicketNumber(),
        user_type: 'A',
        ...body,
    });
    await filling.save();

    res.status(201).json(filling);
}

const updateFilling = async (req, res = response) => {

    const { id } = req.params;
    const { response_date, state } = req.body;

    const filling = await Filling.findByIdAndUpdate(id, {response_date, state}, { new: true });

    res.json(filling);
}

module.exports = {
    fillingsGet,
    getFillingByTicketNumber,
    createFillingIdentifiedUser,
    createFillingAnonimousUser,
    updateFilling,
}