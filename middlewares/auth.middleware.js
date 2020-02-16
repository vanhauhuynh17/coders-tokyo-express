var db = require('../db');

module.exports.requireAuth =  function(req, res, next){
	console.log(req.cookies, req.signedCookies);
	if (!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;

	}
	var user = db.get('users').find({id: req.signedCookies.userId}).value();
	if (!user){
		ers.redirect('/auth/login');

	}
	res.locals.user = user;
	res.locals.test = "abc";
	next();

	
}