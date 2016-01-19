var express = require('express');
var router = express.Router();
var fs = require('fs');
var products = require('../db/products.js');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
// router.use( '/*', function ( req, res, next ) {
//   var logMessage = '\n\n[Method]: ' + req.method + '\n[URI]: ' + encodeURIComponent( req.params['0'] ) + '\n[Timestamp]: ' + new Date() + '\n[Headers]: ' + JSON.stringify( req.headers );
//   fs.appendFile( './logs/products_log/products.log', logMessage, function ( err ) {
//       if ( err ) console.log ( err );
//     });
//   next();
// });

// renders landing page for product entry, updating, search, and removal
router.get('/', function(req,res){
  res.render( 'products/index.jade', {
    "products": products.all()
  });
});

// returns html form to edit items name, price, and inventory
router.get('/:id/edit', function(req,res){
  products.getById(req.params.id, function(err,product){
    if (err) {
      return res.send({success: false, message: err.message});
    }
    res.render( 'products/edit', {
      "product": product
    });
  });
});

// returns html by ID showing current item inventory and price
router.get('/:id/show', function(req,res){
    products.getById(req.params.id, function(err,product){
    if (err) {
      return res.send({success: false, message: err.message});
    }
    res.render( 'products/show', {
      "product": product
    });
  });
});

// returns html form to add new item
router.get('/new', function(req,res){
    res.render( 'products/new', {
      'products': products.all()
    });
});

// updates price and inventory
router.post('/', function(req,res){
  var result = products.add(req.body);
  return res.redirect('/products');
});

// helper route to redirect to edit page with user inputted ID
router.post('/edit', function(req,res){
  res.redirect('/products/' + req.body.productID + '/edit');
});

// helper route to redirect to show page with user inputted ID
router.post('/show', function(req,res){
  res.redirect('/products/' + req.body.productID + '/show');
});

// handles PUT request to update name, price, and inventory
router.put('/:id', function(req,res){
  var result = products.edit(req.body, req.params.id);
  return res.redirect('/products');
});

// handles DELETE request to remove product from list
router.delete('/', function(req,res){
  var result = products.deleteProduct(req.body.productID);
  return res.redirect('/products');
});

module.exports = router;