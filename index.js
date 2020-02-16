// console.log(process.env);
require('dotenv').config();
console.log('SESSION_SECRET');
console.log(process.env.SESSION_SECRET);


var express = require('express');
var csurf = require('csurf');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');



var db = require('./db');
var userRoute= require('./routes/user.route');
var authRoute= require('./routes/auth.route');
var cartRoute= require('./routes/cart.route');
var productRoute = require('./routes/product.route');
var apiProductRoute=require('./api/routes/product.route');







// CRUD = CREATE RETIRVE UPDTE DELETE
var app = express();

var port = 3000;
// var users = [
// 			{id:1, name:'Hau'},
// 			{id:1, name:'A'},
// 			{id:1, name:'B'},
// 			{id:1, name:'C'},
// 			{id:4, name:'mới'},
			
// 		];


mongoose.connect(process.env.MONGO_URL);


app.set("view engine", "pug");
app.set ("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
//Thằng này là một middleware
// app.use(csurf({cookie:true}));



app.get('/', function(req, res){
	// res.send('<h1>Hello Coder Tokyo !</h1>');
	console.log('cookies');
	console.log(req.cookies);
	res.render('index', {
		name : 'AAA'
	});
	res.end();
});
app.use('/users', authMiddleware.requireAuth  ,userRoute);
app.use('/products', productRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/api/products',apiProductRoute);



app.listen(port, function(){
	console.log('Server is running in port: ' + port);
});