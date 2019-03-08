'use strict';

/* global bookmarkList, store, api */

function main() {
  $('#rating').val(store.filterRating);

  // Get remote bookmarks
  api.getBookmarks()
    .then((bookmarks) => {

      // Update local store.bookmarks array with remote values
      // id, title, url, rating = 5, description = '' 
      bookmarks.forEach(bookmark => store.addBookmark(
        bookmark.id, 
        bookmark.title,
        bookmark.url,
        bookmark.rating,
        bookmark.desc
      ));

      // Listen for clicks
      bookmarkList.bindEventListeners();

      // Take data return from API and transform to HTML
      bookmarkList.generateBookmarkItems(store.bookmarks);

      // Render
      bookmarkList.render();

    });

}

$(main);