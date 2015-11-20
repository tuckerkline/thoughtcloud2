var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var routes = require('./routes/index');

var app = express();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/thoughtcloud')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.post('/getCity', function(req, res){
	console.log(req.body.url)

	var loc = {city: '', state: ''}

  request({
    url: req.body.url,
    json: true
	}, function (error, response, body) {
		if(error){
			console.log(error)
		} else {
			loc.city = body.results[3].address_components[0].long_name
			loc.state = body.results[3].address_components[2].short_name
			res.send(loc)
		}
	})

	
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, function() {
  console.log('go on...')
})


module.exports = app;
