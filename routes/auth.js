const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields, validateJWT } = require('../middlewares');

const { login, validateTokenUser } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('<Email>', 'Email is required').isEmail(),
    check('<Password>', 'Password is required').not().isEmpty(),
    validateFields
],login );

router.get('/',[
    validateJWT
], validateTokenUser );

module.exports = router;