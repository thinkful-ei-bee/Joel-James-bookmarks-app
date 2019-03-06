'use strict';

const bookmarkList = (function() {

  function generateBookmarkElement(bookmark) {
    
    return `
    <li>
    <form>
     
      <div class="bookmark-title">
        <p>${bookmark.title}</p>
        
        <div class="form-group">
          <ul class="bookmark-rating">
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="far fa-star"></i></li>
          </ul>
        </div>

      </div>
    </form>
  </li>`;
  }

  function generateExpandedBookmark() {

  }

  // template functions here



  // renderer:
  function render() {

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
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());
