// module.exports = {
// 	a: 1,
// 	b: 2

// };
// TƯƠNG TỰ
// module.exports.a = 1;
var db = require('../db');
var shortid = require('shortid');










module.exports.index =function(req, res){
	
	res.render('users/index', {
		users: db.get("users").value()
	})
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
		user: user,
		csrfToken: req.csrfToken()
	});

};
module.exports.postCreate = function(req, res){




	// console.log(res.locals);

	req.body.avatar=req.file.path.split('\\').slice(1).join('\\');
	req.body.id = shortid.generate();
	db.get("users").push(req.body).write();
	res.redirect('/users');

	
};