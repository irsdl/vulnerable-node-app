const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
	username: {
		type: String
	},
	first_name: {
		type: String
	},
	last_name: { 
		type: String
	},
	email: {
		type: String
	},
	role: {
		type: String
	},
	password: {
		type: String
	},
	locked: {
		type: Boolean
	}, 
 	resetPasswordToken: {
		type: String
	}
}, {
	collection: 'users'
});

module.exports = mongoose.model('User', User);