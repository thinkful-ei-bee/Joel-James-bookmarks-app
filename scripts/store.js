'use strict';

/* global bookmarks */

const store = (function(){

  const addBookmark = function(bookmark) {
    this.bookmarks.push(
      {
        'id':           bookmark.id,
        'title':        bookmark.title,
        'rating':       bookmark.rating,
        'url':          bookmark.url,
        'description':  bookmark.desc,
      }
    );
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndUpdate = function(id, newData) {
    return Object.assign(this.findById(id), newData);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const toggleFilterRating = function(rating) {
    // filter bookmarks based on rating
    console.log('toggleFilterRating() says hello and wants you to finish coding it !!!')
  };

  const setBookmarkExpanded = function(id) {
    if(this.expanded === null) {
      this.expanded = id;
    }
    // additional logic could follow here
  };

  return {
    bookmarks: [],
    error: null,
    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,
    toggleFilterRating,
    setBookmarkExpanded,
    filterRating: 4,
    expanded: null,
  };

}());