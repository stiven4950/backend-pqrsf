const { Router } = require('express');

const { validateJWT, validateFields } = require('../middlewares');

const {
    fillingsGet,
    getFillingByTicketNumber,
    createFillingAnonimousUser,
    createFillingIdentifiedUser,
    updateFilling,
} = require('../controllers/filling');

const router = Router();

router.get('/', fillingsGet);
router.get('/:ticket', getFillingByTicketNumber);

router.post('/anonimous', [
    validateJWT,
    validateFields
], createFillingAnonimousUser);

router.post('/identified', [
    validateJWT,
    validateFields
], createFillingIdentifiedUser);

router.put('/', [
    validateJWT,
    validateFields,
], updateFilling);

module.exports = router;