var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');
var validate = require('../validate/user.validate');
// var authMiddleware = require('../middlewares/auth.middleware');








router.get('/search', controller.search);
router.get('/create', controller.create);
router.post('/create',validate.postCreate, controller.postCreate);



router.get('',controller.index);
router.get('/:id', controller.get);

module.exports = router;
