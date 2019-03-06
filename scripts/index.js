'use strict';

/* global bookmarkList, store, api */

//function main() {
$(document).ready(function() {
  bookmarkList.bindEventListeners();

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBook(bookmark));
    console.log(store.bookmarks);
  });

});


//$(main);