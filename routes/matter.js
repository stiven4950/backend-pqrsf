const { Router } = require('express');

const { validateJWT, validateFields } = require('../middlewares');

const { mattersGet, matterCreate } = require('../controllers/matter');

const router = Router();

router.get('/', mattersGet );

router.post('/', [
    validateJWT,
    validateFields
], matterCreate );

module.exports = router;