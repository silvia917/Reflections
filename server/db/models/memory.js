var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var schema = new Schema({
	date: {type: Date, required: true, default: new Date},
	memory: {type: String, required: true},
	user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	youtube: String,
	video: String
	})

mongoose.model('Memory', schema);