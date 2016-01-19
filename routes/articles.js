var express = require('express');
var router = express.Router();
var fs = require('fs');
var articles = require('../db/articles.js');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
// router.use( '/*', function ( req, res, next ) {
//   var logMessage = '\n\n[Method]: ' + req.method + '\n[URI]: ' + encodeURIComponent( req.params['0'] ) + '\n[Timestamp]: ' + new Date() + '\n[Headers]: ' + JSON.stringify( req.headers );
//   fs.appendFile( './logs/articles_log/articles.log', logMessage, function ( err ) {
//       if ( err ) console.log ( err );
//     });
//   next();
// });

// renders landing page for article entry, updating, search, and removal
router.get('/', function(req,res){
  res.render( 'articles/index.jade', {
    "articles": articles.all()
  });
});

router.get('/all', function(req,res){
  res.send( articles.all() );
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
  var urlTitle = encodeURIComponent(req.params.title);
  articles.edit(urlTitle, req.body);
  return res.redirect('/articles');
});

// handles DELETE request to remove article from list
router.delete('/', function(req,res){
  var result = articles.deleteArticle(req.body.title);
  return res.redirect('/articles');
});

module.exports = router;