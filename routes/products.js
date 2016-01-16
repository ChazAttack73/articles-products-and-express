var express = require('express');
// var server = express();
var router = express.Router();
var fs = require('fs');
var products = require('../db/products.js');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req,res){
  res.send(products.all());
});

// returns product array
router.get('/all', function(req,res){
  res.send(products.all());
});

router.post('/', function(req,res){
  // console.log(req.body,res);
  var result = products.add(req.body);
  res.send(result);
});

router.put('/', function(req,res){
  res.send('put products');
});

router.delete('/', function(req,res){
  res.send('delete products');
});

module.exports = router;