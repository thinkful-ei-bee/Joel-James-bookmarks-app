'use strict';

/* global store */

const store = (function(){
  //let bookmarks = [];
  // response.id, response.title,response.url, response.desc, response.rating
  const addBookmark = function(id, title, url, rating = 5, description = '') {
    this.bookmarks.push({ id, title, url, rating, description, });
    //console.log(this.bookmarks);
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

  const setBookmarkExpanded = function(id) {
   
    this.expanded = id;
    
    // additional conditionals to follow given enough time
  };

  return {
    bookmarks: [],
    error: null,
    addBookmark,
    showAdding: false,
    findById,
    findAndUpdate,
    findAndDelete,
    setBookmarkExpanded,
    filterRating: 5,
    expanded: null,
  };

}());