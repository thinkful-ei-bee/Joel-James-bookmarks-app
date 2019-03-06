'use strict';
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/joel-james';
  
  const getBookmark = function(){
    $.getJSON(`${BASE_URL}/bookmarks`);
  };
  
  //http://api.jquery.com/jquery.ajax/ does this jQuery make sense?

  const createBookmark = (data, onSuccess, onError) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: onSuccess,
      error: onError
    });
  };

  const deleteBookmark = (id, onSuccess) => {
    $.ajax({
     url: `${BASE_URL}/bookmarks/${id}`,
        method: 'DELETE',
        success: onSuccess
    });
};

  return {
      getBookmark , createBookmark, deleteBookmark 
    };
}());