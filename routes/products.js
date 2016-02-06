var express = require( 'express' );
var router = express.Router();
var fs = require( 'fs' );
var products = require( '../db/products.js' );
var bodyParser = require( 'body-parser' );

router.use( bodyParser.urlencoded( {extended: true} ) );

// renders landing page for product entry, updating, search, and removal
router.get( '/', function ( req, res ) {
  products.all()
    .then( function ( data ) {
      productsArray = data;
      res.render( 'products/index.jade', {
        "products": productsArray
      });
    })
    .catch( function ( error ) {
      console.log( error );
    });
});

// returns html form to edit items name, price, and inventory
router.get( '/:id/edit', function ( req, res ) {
  products.getById( req.params.id )
    .then( function ( data ) {
      res.render( 'products/edit', {
        "product": data[0]
      });
    })
    .catch( function () {
      console.log( error );
    });
});

// returns html by ID showing current item inventory and price
router.get( '/:id/show', function ( req, res ) {
    products.getById( req.params.id )
    .then( function ( data ) {
      res.render( 'products/show', {
        "product": data[0]
      });
    })
    .catch( function () {
      console.log( error );
    });
});

// returns html form to add new item
router.get( '/new', function ( req, res ){
  res.render( 'products/new', {
    'products': products.all()
  });
});

// updates price and inventory
router.post( '/', function ( req, res ){
  products.add( req.body  )
    .then( function () {
      return res.redirect( '/products' );
    })
    .catch( function ( error ) {
      console.error( error );
    });
});

// helper route to redirect to edit page with user inputted ID
router.post( '/edit', function ( req, res ) {
  res.redirect( '/products/' + req.body.productID + '/edit' );
});

// helper route to redirect to show page with user inputted ID
router.post( '/show', function ( req, res ) {
  res.redirect( '/products/' + req.body.productID + '/show' );
});

// handles PUT request to update name, price, and inventory
router.put( '/:id', function ( req, res ) {
  products.edit( req.body, req.params.id )
    .then( function () {
      res.redirect( '/products' );
    })
    .catch( function () {
      console.log( error );
    });
});

// handles DELETE request to remove product from list
router.delete( '/', function ( req, res ) {
  return res.redirect( '/products' );
});

module.exports = router;