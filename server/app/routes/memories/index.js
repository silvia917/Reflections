var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Memory = mongoose.model('Memory')
var User = mongoose.model('User')
var _ = require('lodash');
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('51127e7e46317be011447dac045048b87bd253e3');

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
	alchemy.sentiment(req.memory.memory, {}, function(err, response) {
  if (err) throw err;
  var sentiment = response.docSentiment;
  req.sentiment = sentiment;
  req.sentiment.text = req.memory.memory
  req.sentiment.date = req.memory.date
  req.sentiment.photo = req.memory.user.photo
	res.status(200).json(req.sentiment)
})
});

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