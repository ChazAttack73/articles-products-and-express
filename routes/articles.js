var express = require('express');
var router = express.Router();
var fs = require('fs');
var articles = require('../db/articles.js');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

// renders landing page for article entry, updating, search, and removal
router.get('/', function(req,res){
  res.render( 'articles/index.jade', {
    "articles": articles.all()
  });
});

// returns html form to edit items name, price, and inventory
router.get('/:title/edit', function(req,res){
  articles.getByTitle(req.params.title, function(err,article){
    if (err) {
      return res.send({success: false, message: err.message});
    }
    res.render( 'articles/edit', {
      "article": article
    });
  });
});

// returns html by Title showing current item inventory and price
router.get('/:title/show', function(req,res){
    articles.getByTitle(req.params.title, function(err,article){
    if (err) {
      return res.send({success: false, message: err.message});
    }
    res.render( 'articles/show', {
      "article": article
    });
  });
});

// returns html form to add new item
router.get('/new', function(req,res){
    res.render( 'articles/new', {
      'articles': articles.all()
    });
});

// updates price and inventory
router.post('/', function(req,res){
  var result = articles.add(req.body);
    //console.log(req.body);
  return res.redirect('/articles');
});

// helper route to redirect to edit page with user inputted ID
router.post('/edit', function(req,res){
  res.redirect('/articles/' + encodeURIComponent(req.body.title) + '/edit');
});

// helper route to redirect to show page with user inputted ID
router.post('/show', function(req,res){
  res.redirect('/articles/' + encodeURIComponent(req.body.title) + '/show');
});

// handles PUT request to update name, price, and inventory
router.put('/:title/', function(req,res){
  var result = articles.edit(req.body);
  return res.redirect('/articles');
});

// handles DELETE request to remove article from list
router.delete('/', function(req,res){
  var result = articles.deleteArticle(req.body.title);
  return res.redirect('/articles');
});

module.exports = router;