// module.exports = {
// 	a: 1,
// 	b: 2

// };
// TƯƠNG TỰ
// module.exports.a = 1;
var db = require('../db');
var shortid = require('shortid');
var User = require('../models/user.model');
// var mongoose = require('mongoose');


// const userModel = mongoose.model('User');










module.exports.index =function(req, res){
	User.find().then(function(users){{
		res.render('users/index', {
		users: users
	})

	}});
	
	// res.render('users/index', {
	// 	users: db.get("users").value()
	// })
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
	User.findOne ({ _id: id }, function (err, user) {
  if (err) console.log (err);
  if (!user) console.log ('user not found');
  // do something with user
  console.log(user);
  res.render('users/view', {
		user: user,
		// csrfToken: req.csrfToken()
	});
});
	// var user = db.get("users").find({id: id}).value();
	
	

};
module.exports.postCreate = function(req, res){




	// console.log(res.locals);

	// req.body.avatar=req.file.path.split('\\').slice(1).join('\\');
	req.body.id = shortid.generate();
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.phone = req.body.phone;
	user.password = req.body.password;
	user.save();

	// db.get("users").push(req.body).write();
	res.redirect('/users');

	
};