const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const { usersGet, usersDelete } = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.delete('/:id', [
    validateJWT,
    check('id', 'It is not a valid Mongo Id').isMongoId(),
    validateFields
], usersDelete);

module.exports = router;