var express = require('express');
var router = express.Router();
var controller = require('../controllers/auth.controller');
// var validate = require('../validate/auth.validate');


router.get('/login', controller.login);
router.post('/login', controller.postLogin);

module.exports = router;
