'use strict';

/* global bookmarkList, store, api */

function main() {

  console.log('derp');

  bookmarkList.bindEventListeners();

  // Get remote bookmarks
  api.getBookmarks()
    .then((bookmarks) => {

      // Update local store.bookmarks array with remote values 
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));

      // Listen for clicks
      bookmarkList.bindEventListeners();

      //
      bookmarkList.render();

    });

}

$(main);