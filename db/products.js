module.exports = (function(){
  var productsArray = [];
  var prodID = 1;

  function _all(){
    return productsArray;
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
        console.log('not unique');
        unique = false;
      }
    }
    return unique;
  }

  return {
    all: _all,
    add: _add,
    edit: _editByID,
    deleteProduct: _deleteProduct
  };

})();