'use strict';

/* global bookmarkList, store, api */

function main() {

  console.log('derp');

  bookmarkList.bindEventListeners();

  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach(bookmark => {
        store.addBookmark(bookmark);
        // do other stuff
        console.log(store.bookmarks);
        // call render

      });
    });

}

$(main);