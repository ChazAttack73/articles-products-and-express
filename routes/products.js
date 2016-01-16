var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
  res.send('get products');
});

router.post('/', function(req,res){
  res.send('post products');
});

router.put('/', function(req,res){
  res.send('put products');
});

router.delete('/', function(req,res){
  res.send('delete products');
});

module.exports = router;