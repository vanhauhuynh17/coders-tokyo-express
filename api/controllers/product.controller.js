
var db = require('../../db');
var shortid = require('shortid');
var Product = require('../../models/product.model');










module.exports.index =function(req, res){

	Product.find().then(function(products){
				res.json(products);
				// res.send('hello');

		

	});
	

};

module.exports.create= async function(req, res){

	var product = await Product.create(req.body);
	res.json(product);


};