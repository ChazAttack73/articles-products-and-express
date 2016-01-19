var express = require('express');
var app = express();
var products = require('./routes/products');
var articles = require('./routes/articles');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride(function(req,res){
  var method = req.body._method;
  delete req.body._method;
  return method;
}));

app.use( '/*', function ( req, res, next ) {
  var newDate = new Date();
  var logDate = (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
  var logMessage = '\n\n[Method]: ' + req.method + '\n[URI]: ' + req.params['0'] + '\n[Timestamp]: ' + newDate + '\n[Headers]: ' + JSON.stringify( req.headers );

  fs.appendFile( './logs/awesome_traffic_log/' + logDate + '.log', logMessage, function ( err ) {
      if ( err ) console.log ( err );
    });
  next();
});

app.use('/products', products);
app.use('/articles', articles);

app.set('view engine', 'jade');
app.set('views', './templates');

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at localhost:', port);
});
