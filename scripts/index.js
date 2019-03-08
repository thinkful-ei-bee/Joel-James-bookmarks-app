'use strict';

/* global bookmarkList, store, api */

function main() {

  // Get remote bookmarks
  api.getBookmarks()
    .then((bookmarks) => {

      // Update local store.bookmarks array with remote values 
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));

      // Listen for clicks
      bookmarkList.bindEventListeners();

      // Take data return from API and transform to HTML
      bookmarkList.generateBookmarkItems(store.bookmarks);

      // Render
      bookmarkList.render();

    });

}

$(main);