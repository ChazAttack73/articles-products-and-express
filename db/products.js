module.exports = ( function () {
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
    return db.query( "SELECT * FROM product_list" );
  }

  function _add ( req ) {
    return db.none(
      "INSERT INTO product_list ( name, price, inventory )" +
      "VALUES ( $1, $2, $3 )",
      [ req.name, req.price, req.inventory ]
    );
  }

  function _getById ( id ) {
    return db.query( "SELECT * FROM product_list WHERE id=$1", id );
  }

  function _editByID ( req, id ) {
    return db.query(
      "UPDATE product_list SET name=$1, price=$2, inventory=$3 WHERE id=$4",
      [ req.name, req.price, req.inventory, id ]
    );
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

  return {
    all: _all,
    add: _add,
    getById: _getById,
    edit: _editByID,
    deleteProduct: _deleteProduct,
  };

})();