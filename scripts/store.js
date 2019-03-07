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
        'exanded':      false,
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

  const setBookmarkExpand = function(id, isExpanded) {
    const bookmark = this.findById(id);
    // set isExpanded to true to expand bookmark
    bookmark.isExpanded = isExpanded;
  };

  return {
    bookmarks: [],
    error: null,
    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,
    toggleFilterRating,
    setBookmarkExpand,
    filterRating: 4,
  };

}());