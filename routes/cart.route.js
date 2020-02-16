var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart.controller');
// var validate = require('../validate/auth.validate');

router.get('/add/:productId', controller.addToCart);
module.exports = router;