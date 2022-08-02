const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validateJWT,
} = require('../middlewares');


const { emailExists, existsAdminById } = require('../helpers/db-validators');

const {
    adminPost,
    adminPut,
    adminPatch,
    adminDelete,
} = require('../controllers/admin');

const router = Router();

router.put('/:id', [
    check('id', 'Id is incorrect').isMongoId(),
    check('id').custom(existsAdminById),
    validateFields
], adminPut);

router.post('/', [
    check('name', '<name> is required').not().isEmpty(),
    check('password', '<password> must be larger than 5 characters').isLength({ min: 6 }),
    check('email', '<email> is incorrect').isEmail(),
    check('email').custom(emailExists),
], adminPost);

router.delete('/:id', [
    validateJWT,
    check('id', 'It is not a valid Mongo Id').isMongoId(),
    check('id').custom(existsAdminById),
    validateFields
], adminDelete);

router.patch('/', adminPatch);

module.exports = router;