'use strict';

/* global store */

const bookmarkList = (function() {

  function generateBookmarkElement(bookmark) {
    
    return `
    <li>
    <form>
     
      <div class="bookmark-title">
        <p>${bookmark.title}</p>
        
        <div class="form-group">
          <ul class="bookmark-rating">
            ${generateBookMarkElementRatingHelper(bookmark.rating)}
          </ul>
        </div>

      </div>
    </form>
  </li>`;
  }

  function generateBookMarkElementRatingHelper(rating) {
    let ratingList = [];
    let count = 0;
    for (let i = 0; i <= rating; i++) {
      if(count >= rating) {
        ratingList[i] = '<li><i class="far fa-star"></i></li>';
      }
      else {
        ratingList[i] = '<li><i class="fas fa-star"></i></li>';
      }
      count++;
    }
    return ratingList.join('');
  }

  function generateExpandedBookmark() {

  }

  // template functions here



  // renderer:
  function render() {
    let bookmarksToRender = store.bookmarks.filter( bookmark => bookmark.rating <= store.filterRating );
    console.log(bookmarksToRender);
  }

  function handleAddBookmark() {

    $('#add-bookmark').click((event) => {
      event.preventDefault();
      console.log('hi');
    });

    

  }
  
  function handleMinRating() {
  
  }
  
  function handleSaveBookmark() {
    $('#bookmarks-list').on('click', '#create-bookmark-save', (event) => {
      event.preventDefault();
      console.log('hi');
    });
  }
  
  function handleCancelBookmark() {
    $('#bookmarks-list').on('click', '#create-bookmark-cancel', event => {
      event.preventDefault();
      store.addBookmark = false;
    });
  }
  
  function handleDeleteBookmark() {
  
  }
  
  function handleExpandBookmark() {
    
  }
  
  function bindEventListeners() {
    handleAddBookmark();
    handleMinRating(); 
    handleSaveBookmark();
    handleCancelBookmark();
    handleDeleteBookmark();
    handleExpandBookmark();
  }

  return {
    generateBookmarkElement,
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());
