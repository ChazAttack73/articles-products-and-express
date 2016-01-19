var express = require('express');
var app = express();
var products = require('./routes/products');
var articles = require('./routes/articles');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride(function(req,res){
  var method = req.body._method;
  delete req.body._method;
  return method;
}));

app.use('/products', products);
app.use('/articles', articles);

app.set('view engine', 'jade');
app.set('views', './templates');

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at localhost:', port);
});
