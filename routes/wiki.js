var express = require('express');
var router = express.Router();
var models = require('../models/index.js');

var User = models.User;
var Page = models.Page;

router.get('/', function(req, res, next){
  //res.send('got to GET /wiki/');
  res.redirect('/');
});

router.post('/', function(req, res, next){
  //res.send('got to POST /wiki');
  console.log(req.body);
  var page = Page.build({
    title: req.body.title,
    urlTitle: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  page.save();
  res.redirect('/');
  //res.render('');
});

router.get('/add', function(req, res, next){
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});


module.exports = router;

