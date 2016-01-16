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
      prodEntry.id = prodID;
        prodID++;
      productsArray.push(prodEntry);
      return { success: true };
    } else {
      return { success: false };
    }
  }

  function _editByID(){

  }

  function _deleteProduct(){

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