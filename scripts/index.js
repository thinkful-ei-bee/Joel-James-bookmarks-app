'use strict';

/* global bookmarkList, store, api */

function main() {
  bookmarkList.bindEventListeners();

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBook(item));
    console.log(store.bookmarks);
  });

}


$(main);