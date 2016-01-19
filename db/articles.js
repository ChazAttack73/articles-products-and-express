module.exports = (function(){
  var articlesArray = [];
  var articleID = 1;

  function _all(){
    return articlesArray;
  }

  function _add(req){
    if( uniqueArticle(articlesArray,req.title )){
      var articleEntry = {};
      articleEntry.title = req.title;
      articleEntry.author = req.author;
      articleEntry.content = req.content;
      articleEntry.id = articleID.toString();
        articleID++;
      articlesArray.push(articleEntry);
      return { success: true };
    } else {
      return { success: false };
    }
  }

  function _editByID(req, id){
    var exists = false;
    var index = 0;
    for (var i = 0; i < articlesArray.length; i++) {
      if (articlesArray[i].id === id){
        exists = true;
        index = i;
      }
    }
    if( exists === true ) {
      if( req.author !== undefined ) {
        articlesArray[index].author = req.author;
      }
      if( req.content !== undefined) {
        articlesArray[index].content = req.content;
      }
      if( req.title !== undefined ) {
        articlesArray[index].title = req.title;
      }
      return { success: true };
    }
    return { success: false };
  }

  function _deleteArticle(id){
    var exists = false;
    var index = 0;
    for (var i = 0; i < articlesArray.length; i++) {
      if (articlesArray[i].id === id){
        exists = true;
        index = i;
      }
    }
    if( exists === true ) {
      articlesArray.splice(index, 1);
      return { success: true };
    }
    return { success: false };
  }

  function uniqueArticle (arr,title){
    unique = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].title === title){
        unique = false;
      }
    }
    return unique;
  }

  function getSingleArticleByID (id,callback){
    var index = 0;
    for (var i = 0; i < articlesArray.length; i++) {
      if (articlesArray[i].id === id){
        exists = true;
        index = i;
        return callback(null,articlesArray[i]);
      }
    }
    return callback(new Error('Cannot find article'));
  }

  function getSingleArticleByTitle (title,callback){
    var index = 0;
    for (var i = 0; i < articlesArray.length; i++) {
      if (articlesArray[i].title === title){
        exists = true;
        index = i;
        return callback(null,articlesArray[i]);
      }
    }
    return callback(new Error('Cannot find article'));
  }

  return {
    all: _all,
    add: _add,
    edit: _editByID,
    deleteArticle: _deleteArticle,
    getById: getSingleArticleByID,
    getByTitle: getSingleArticleByTitle
  };
})();