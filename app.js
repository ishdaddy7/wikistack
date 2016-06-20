
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var models = require('./models/index.js');
var router = require('./routes/wiki.js')
//UPDATE THIS W/ directory
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); // May want to use the urlencoded implementation of bodyparse
app.use('/wiki',router);

app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

/*app.get('/', function(req, res, next){
	res.render('index.html');
	//res.end();
})
*/
//console.log(models);
models.User.sync({})
.then(function(){
	return models.Page.sync({})
})
.then(function(){
	app.listen(3001, function(){
		console.log('Server is listening on port 3001!');
	});
})
.catch(console.error);
 //Follow directions here

