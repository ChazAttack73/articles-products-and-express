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
router.get('/:id/edit', function(req,res){
  articles.getById(req.params.id, function(err,article){
    if (err) {
      return res.send({success: false, message: err.message});
    }
    res.render( 'articles/edit', {
      "article": article
    });
  });
});

// returns html by ID showing current item inventory and price
router.get('/:id/show', function(req,res){
    articles.getById(req.params.id, function(err,article){
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
  return res.redirect('/articles');
});

// helper route to redirect to edit page with user inputted ID
router.post('/edit', function(req,res){
  res.redirect('/articles/' + req.body.articleID + '/edit');
});

// helper route to redirect to show page with user inputted ID
router.post('/show', function(req,res){
  res.redirect('/articles/' + req.body.articleID + '/show');
});

// handles PUT request to update name, price, and inventory
router.put('/:id', function(req,res){
  var result = articles.edit(req.body, req.params.id);
  return res.redirect('/articles');
});

// handles DELETE request to remove article from list
router.delete('/', function(req,res){
  var result = articles.deleteArticle(req.body.articleID);
  return res.redirect('/articles');
});

module.exports = router;