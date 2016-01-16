module.exports = (function(){
  var productsArray = [];
  var prodID = 1;

  function _all(){
    return productsArray;
    // return 'hello, is it me you are looking for';
  }

  function _add(req,res){

  }

  function _editByID(){

  }

  function _deleteProduct(){

  }

  return {
    all: _all,
    add: _add,
    edit: _editByID,
    deleteProduct: _deleteProduct
  };

})();