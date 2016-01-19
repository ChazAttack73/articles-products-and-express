module.exports = (function(){
  var articlesArray = [];

  function _all(){
    return articlesArray;
  }

  function _add(req){
    if( uniqueArticle( articlesArray,req.title )){
      var articleEntry = {};
      articleEntry.title = req.title;
      articleEntry.author = req.author;
      articleEntry.content = req.content;
      articleEntry.urlTitle = encodeURIComponent(req.title);
      articlesArray.push(articleEntry);
      return { success: true };
    } else {
      return { success: false };
    }
  }

  function _editByTitle(urlTitle,req){
    var exists = false;
    var index = 0;
    console.log(urlTitle);
    console.log(articlesArray[0].urlTitle);

    for (var i = 0; i < articlesArray.length; i++) {
      if (articlesArray[i].urlTitle === urlTitle){
        console.log(articlesArray[i].urlTitle);
        console.log(req.title);

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
      console.log(articlesArray);
      return { success: true };
    }
    return { success: false };
  }

  function _deleteArticle(title){
    var exists = false;
    var index = 0;
    for (var i = 0; i < articlesArray.length; i++) {
      if (articlesArray[i].title === title){
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
    edit: _editByTitle,
    deleteArticle: _deleteArticle,
    getByTitle: getSingleArticleByTitle
  };
})();