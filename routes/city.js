const { Router } = require('express');

const { validateJWT, validateFields } = require('../middlewares');

const { citiesGet, cityCreate } = require('../controllers/city');

const router = Router();

router.get('/', citiesGet );

router.post('/', [ 
    validateJWT,
    validateFields
], cityCreate );

module.exports = router;