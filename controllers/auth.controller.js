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
	if (email !== 'user@gmail.com' && password !== 'user'){
			res.render('auth/login' , {
			'errors':
			[
				'username or password is incorrect !'
			],
			'values' : req.body
			});
			return;

	}
	// =====================================


	// var hashedPassword = md5(password);
	// var user = db.get('users').find({email:email}).value();
	// if (!user){
	// 	res.render('auth/login' , {
	// 		'errors':
	// 		[
	// 			'user does not exists !'
	// 		],
	// 		'values' : req.body
	// 	});
	// 	return;

	// }
	// if (user.password !== hashedPassword){
	// 	res.render('auth/login' , {
	// 		'errors':
	// 		[
	// 			'Wrong password !'
	// 		]
	// 	});
	// 	return;

	// }
	var user = {
		  "name": "User",
      	"email": "user@gmail.com",
      	"password": "e10adc3949ba59abbe56e057f20f883e",
     	 "phone": "123123123",
     	 "id": "9EQkdCoW"
	};
	res.cookie('userId', user.id, 
		{signed: true}

	);
	// console.log('truoc redirect');
	res.redirect('/users');
	
};

