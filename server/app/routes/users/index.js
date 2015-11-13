var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Memory = mongoose.model('Memory')
var User = mongoose.model('User')

router.get('/', function(req, res, next) {
	User.find({})
		.populate('memories')
		.then(function(users) {
			res.status(200).json(users)
		})
		.then(null, next)
})

router.get('/:id', function(req, res, next) {
	User.find({_id: req.params.id})
		.populate('memories')
		.then(function(user) {
			res.status(200).json(user)
		})
})

module.exports = router;