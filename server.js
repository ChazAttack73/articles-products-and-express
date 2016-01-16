var express = require('express');
var app = express();
var products = require('./routes/products');

app.use('/products', products);

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log(server.address());

  console.log('Example app listening at localhost:', port);
});