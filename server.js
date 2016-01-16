var express = require('express');
var app = express();
var router = express.Router();
app.use('/', router);

app.get('/', function(req,res,next){
  res.send('hello world');
});






var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log(server.address());

  console.log('Example app listening at localhost:', port);
});