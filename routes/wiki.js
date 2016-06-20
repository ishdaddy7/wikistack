var express = require('express');
var router = express.Router();
var models = require('../models/index.js');

var User = models.User;
var Page = models.Page;

router.get('/', function(req, res, next){
  //res.send('got to GET /wiki/')
  Page.findAll({})
    .then(function(allpages){
      console.log(allpages);
      res.render('index', {pages: allpages});
    })
    .catch(next);
  //res.redirect('/');
});

router.post('/', function(req, res, next){
  //res.send('got to POST /wiki');
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  page.save().then(function(result){
    res.redirect(result.urlTitle);
  });
  //res.render('');
});

router.get('/add', function(req, res, next){
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundpage){
    res.render('wikipage', {data: foundpage});
  })
  .catch(next);
});

module.exports = router;

