const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Config = new Schema({
	name: {
		type: String
	},
	value: {
		type: String
	}
}, {
	collection: 'configs'
});

module.exports = mongoose.model('Config', Config);