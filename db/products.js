module.exports = (function(){
  var prodID = 1;

  var promise = require( 'bluebird' );
  var options = {
    promiseLib : promise
  };
  var pgp = require( 'pg-promise' )( options );
  var cn = {
    host : 'localhost',
    port : 5432,
    database : 'products_and_articles',
    user : 'postgres',
    password : 'postgres'
  };
  var db = pgp( cn );

  function _all () {
    return db.query( "SELECT * FROM product_list", true );
  }

  function _add(req){
    if( uniqueProd(productsArray,req.name )){
      var prodEntry = {};
      prodEntry.name = req.name;
      prodEntry.price = req.price;
      prodEntry.inventory = req.inventory;
      prodEntry.id = prodID.toString();
        prodID++;
      productsArray.push(prodEntry);
      return { success: true };
    } else {
      return { success: false };
    }
  }

  function _editByID(req, id){
    var exists = false;
    var index = 0;
    for (var i = 0; i < productsArray.length; i++) {
      if (productsArray[i].id === id){
        exists = true;
        index = i;
      }
    }
    if( exists === true ) {
      if( req.price !== undefined ) {
        productsArray[index].price = req.price;
      }
      if( req.inventory !== undefined) {
        productsArray[index].inventory = req.inventory;
      }
      if( req.name !== undefined ) {
        productsArray[index].name = req.name;
      }
      return { success: true };
    }
    return { success: false };
  }

  function _deleteProduct(id){
    var exists = false;
    var index = 0;
    for (var i = 0; i < productsArray.length; i++) {
      if (productsArray[i].id === id){
        exists = true;
        index = i;
      }
    }
    if( exists === true ) {
      productsArray.splice(index, 1);
      return { success: true };
    }
    return { success: false };
  }

  function uniqueProd (arr,name){
    unique = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].name === name){
        unique = false;
      }
    }
    return unique;
  }

  function getSingleItemByID (id,callback){
    var index = 0;
    for (var i = 0; i < productsArray.length; i++) {
      if (productsArray[i].id === id){
        exists = true;
        index = i;
        return callback(null,productsArray[i]);
      }
    }
    return callback(new Error('Cannot find item'));
  }

  return {
    all: _all,
    add: _add,
    edit: _editByID,
    deleteProduct: _deleteProduct,
    getById: getSingleItemByID
  };

})();