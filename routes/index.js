var express = require('express');
var router = express.Router();

var Thought = require('../models/thoughts')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/html/template.html', {root: './public'});
});

router.post('/thoughtAdd', function(req, res) {
	var newThought = new Thought ({
		thought : req.body.thought
	})

	newThought.save(function(err, doc) {
        res.send(doc)
    })
})

router.get('/allthoughts', function(req, res) {
    Thought.find({}).exec(function(err, docs) {
        res.send(docs)
        console.log(docs)
    })
})

router.post('/commentadd', function(req, res) {

	Thought.findOneAndUpdate({ thought : req.body.thought}, req.body, function(error, data) {
		console.log(data)
	Thought.findOne({ thought : req.body.thought}, function(error, data) {
		res.send(data)
	})

	})
})

module.exports = router;
