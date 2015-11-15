var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Memory = mongoose.model('Memory')
var User = mongoose.model('User')
var _ = require('lodash')

router.get('/', function(req, res, next) {
	Memory.find({})
		.populate('user')
		.then(function(memories) {
			res.status(200).json(memories)
		})
		.then(null, next)
})

router.post('/', function(req, res, next) {
	var newMemory;
	console.log('hihimemories')
	console.log("req.body", req.body)
	Memory.create(req.body)
		.then(function(memory) {
			newMemory = memory;
			console.log(newMemory.user)
			return User.findById(newMemory.user)
		})
		.then(function(user) {
			user.memories.push(newMemory._id);
			return user.save();
		})
		.then(function(user) {
			res.status(201).json(user)
		})
		.then(null, next);
})

router.param("id", function(req, res, next, id){
  Memory.findById(id)
  .populate('user')
  .then(function(memory){
    req.memory = memory;
    next()
  })
  .then(null, next);
})

router.get('/:id', function(req, res) {
	res.status(200).json(req.memory)
})

router.put('/:id', function(req, res, next) {
	Memory.findById(req.params.id).exec().then(function(memory){
		_.extend(memory, req.body);
		memory.save();
       res.status(200).json(memory)
	}).then(null, next)

})

router.delete('/:id', function(req, res) {
	 req.memory.remove()
  		.then(function(){
    	res.sendStatus(204);
  })
})

module.exports = router;