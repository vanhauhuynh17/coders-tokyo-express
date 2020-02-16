var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');
var multer = require('multer');
var upload = multer({ dest: './public/uploads/' });


function middleware1(req, res, next){
	console.log('middleware 1');
	res.send('Hello middleware 1');
	next();
	//nếu ko có next() thì middlware2 ko được gọi
	// có nghĩa res.send() nó sẽ kết thúc req luôn

}
function middleware2(req, res, next){
	console.log('middleware 2');
	res.send("hello middleware 2");

}
router.get('/test', middleware1, middleware2);
router.get('/cookie', function(req, res, next){
	res.cookie('user-id', 12345);
	res.send('hello cookie');

});







router.get('/search', controller.search);
router.get('/create', controller.create);
router.post('/create',
	upload.single('avatar'),validate.postCreate,
	 controller.postCreate);



router.get('', authMiddleware.requireAuth,controller.index);
router.get('/:id', controller.get);

module.exports = router;
