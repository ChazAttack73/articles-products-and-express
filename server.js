var express = require('express');
var app = express();
var router = express.Router();
app.use('/', router);

app.get('/', function(req,res,next){
  res.send('hello world');
});

app.route('/products')

  .get(function(req,res){
    res.send('get products');
  })

  .post(function(req,res){
    res.send('post products');
  })

  .put(function(req,res){
    res.send('put products');
  })

  .delete(function(req,res){
    res.send('delete products');
  });


// router.use('/products', function(req,res,next){
//   res.send('hello world');
// });

// router.use('/articles', function(req,res,next){
//   res.send('hello world');
// });

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log(server.address());

  console.log('Example app listening at localhost:', port);
});