var express = require('express');
var router = express.Router();
var fs = require('fs');
var products = require('../db/products.js');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req,res){
  res.render( 'products/index', {
    products: products.all()
  });
});

// returns product array
router.get('/all', function(req,res){
  res.send(products.all());
});

//updates price and inventory
router.post('/', function(req,res){
  var result = products.add(req.body);
  res.send(result);
});

router.put('/:id/edit', function(req,res){
  var result = products.edit(req.body, req.params.id);
  res.send(result);
});

router.delete('/:id', function(req,res){
  var result = products.deleteProduct(req.params.id);
  res.send(result);
});

module.exports = router;