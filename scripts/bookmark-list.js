'use strict';

const bookmarkList = (function() {

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
    $('#bookmarks-list').on('click', 'create-bookmark-save', (event) => {
      event.preventDefault();
      console.log('hi');
    });
  }
  
  function handleCancelBookmark() {
  
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
