var express = require('express');
var router = express .Router();
var fs = require('fs');
var products = require('../db/products.js');

router.get('/', function(req,res){
  // console.log(products);
  // res.send(products.all());
  res.send(products._all());
});

router.post('/', function(req,res){
  // res.send('post products');
});

router.put('/', function(req,res){
  res.send('put products');
});

router.delete('/', function(req,res){
  res.send('delete products');
});

module.exports = router;