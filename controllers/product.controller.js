
var db = require('../db');
var shortid = require('shortid');
var Product = require('../models/product.model');










module.exports.index =async function(req, res){
	// var page = parseInt(req.query.page) || 1;
	// var perPage = 8;
	// var start = (page -1)*perPage;
	// var end = page*perPage;
	// var startPage = (page -1)==0?1:(page-1);
	// var endPage = (page+1)==2?3:(page+1);


	// var drop = (page -1)*perPage;


	// res.render('products/index', {
	// 	// products: db.get("products").value().slice(start,end)

	// 	// CÁCH 2: VÌ LOWDB ĐƯỢC XÂY DỰNG DỰA TRÊN LODASH
	// 	products:db.get('products').drop(drop).take(perPage).value(),
	// 	startPage:startPage,
	// 	endPage:endPage,
	// 	activePage:page

	// })
	// CÁCH 1

	// Product.find().then(function(products){
	// 	res.json(products);

		

	// });
	//CÁCH 2: AWAIT: ASYNC J ĐÓ, TRONG BÀI JAVASCRIPT
	var products = await Product.find();
	 res.render('products/index', {
		 	products:products

		 });

};

module.exports.search = function(req, res){
	var q = req.query.q;
	
	

	var matchedUsers = db.get("users").value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index',{
		users: matchedUsers,
		q:q

	});
};
module.exports.create = function(req, res){
	res.render('users/create');
};

module.exports.get = function(req, res){
	// var id = parseInt(req.params.id);
	var id = req.params.id;
	var user = db.get("users").find({id: id}).value();
	
	res.render('users/view', {
		user: user
	});

};
module.exports.postCreate = function(req, res){




	console.log(res.locals);
	req.body.id = shortid.generate();
	db.get("users").push(req.body).write();
	res.redirect('/users');

	
};