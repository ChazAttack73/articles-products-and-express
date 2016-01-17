var express = require('express');
var app = express();
var products = require('./routes/products');
var router = express.Router();

app.use('/products', products);

app.set('view engine', 'jade');
app.set('views', './templates');

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at localhost:', port);
});
