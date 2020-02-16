// module.exports = {
// 	a: 1,
// 	b: 2

// };
// TƯƠNG TỰ
// module.exports.a = 1;
var db = require('../db');
var md5 = require('md5');










module.exports.login =function(req, res){
	
	res.render('auth/login' );
};
module.exports.postLogin =function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var hashedPassword = md5(password);
	var user = db.get('users').find({email:email}).value();
	if (!user){
		res.render('auth/login' , {
			'errors':
			[
				'user does not exists !'
			],
			'values' : req.body
		});
		return;

	}
	if (user.password !== hashedPassword){
		res.render('auth/login' , {
			'errors':
			[
				'Wrong password !'
			]
		});
		return;

	}
	res.cookie('userId', user.id, 
		{signed: true}

	);
	console.log('truoc redirect');
	res.redirect('/users');
	
};

