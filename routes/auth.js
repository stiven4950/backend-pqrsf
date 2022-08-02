const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields, validateJWT } = require('../middlewares');

const { login, loginUID, validateTokenUser } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],login );

router.post('/login-uid',[
    check('uid', 'UID is required').isMongoId(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], loginUID );

router.get('/',[
    validateJWT
], validateTokenUser );

module.exports = router;