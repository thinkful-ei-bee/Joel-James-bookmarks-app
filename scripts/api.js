'use strict';
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/joel-james';
  
  const getBookmark = function(){
    $.getJSON(`${BASE_URL}/bookmarks`);
  };

  return {
      getBookmark , createBookmark, deleteBookmark 
    };
}());