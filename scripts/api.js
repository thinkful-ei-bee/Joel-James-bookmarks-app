'use strict';

/* global store */

const api = (function(){
  const baseUrl = 'https://thinkful-list-api.herokuapp.com/james-joel';
  
  function getBookmarks() {
    return bookmarkApiFetch(`${baseUrl}/bookmarks`);
  }
  
  function createBookmark(name) {
    return bookmarkApiFetch(`${baseUrl}/items`,
      {
        method: 'POST',
        headers:
          {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ name }),
      });
  }

  function deleteBookmark(id) {
    return bookmarkApiFetch(`${baseUrl}/items/${id}`, 
      {
        method: 'DELETE',
      });
  }

  function updateBookmark(id, updateData) {
    return bookmarkApiFetch(`${baseUrl}/items/${id}`,
      {
        method: 'PATCH',
        headers:
          {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(updateData),
      });
  } 


  function bookmarkApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if(!res.ok) {
          error = { code: res.status };
          store.error = error;
        }
        return res.json();
      })
      .then(data => {
        //console.log(data);
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }

        return data;
      });
  }

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
    updateBookmark,
  };

}());