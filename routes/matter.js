const { Router } = require('express');

const { validateJWT, validateFields } = require('../middlewares');

const { mattersGet, matterCreate, mattersGetByType } = require('../controllers/matter');

const router = Router();

router.get('/', mattersGet );
router.get('/:matter_type', mattersGetByType );

router.post('/', [
    validateJWT,
    validateFields
], matterCreate );

module.exports = router;