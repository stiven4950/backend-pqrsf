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

router.post('/', [
    validateJWT,
    validateFields
], cityCreate);

module.exports = router;