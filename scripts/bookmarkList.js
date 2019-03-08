'use strict';

/* global store, api*/

const bookmarkList = (function() {

  function generateAddBookmarkHTML() {
    return `
    <form id="bookmark-form-add">
      <p>Create a Bookmark</p>
      <div class="bookmark-title">

        <div class="form-group">
          <div class="col">
              <label for="bookmark-title-add">Title:</label>
              <input id="bookmark-title-add" type="text" value="Google">
          </div>
          <div class="col">
            <label for="bookmark-url-add">Url:</label>
            <input id="bookmark-url-add" type="text" value="https://www.google.com">
          </div>
        </div>

        <div class="form-group">
          <div class="col">
              <label for="bookmark-description-add">Description:</label><br>
              <textarea id="bookmark-description-add"></textarea>
          </div>
        </div>

        <div class="form-group">
          <div class="col">
            <input id="create-bookmark-save" type="submit" value="Save">
          </div>
          <div class="col">
            <input id="create-bookmark-cancel" type="submit" value="Cancel">
          </div>
        </div>
        
        <div class="form-group">
          <ul class="bookmark-rating">
            Rating:
            <li><input type="radio" name="rating" value="1" checked>1<br></li>
            <li><input type="radio" name="rating" value="2" checked>2<br></li>
            <li><input type="radio" name="rating" value="3" checked>3<br></li>
            <li><input type="radio" name="rating" value="4" checked>4<br></li>
            <li><input type="radio" name="rating" value="5" checked>5<br></li>
          </ul>
        </div>

      </div>
    </form>`;
  }

  function generateBookmarkElementExpanded(bookmark) {
    return `
    <li data-item-id="${bookmark.id}">
      <form id="expanded-bookmark-form">

        <p><a class="bookmark-title-link" href="">${bookmark.title}</a><p>

        <div class="col">
          <p>${bookmark.description}</p>
        </div>
        
        <div class="form-group">
          <div class="col">
            <a href="${bookmark.url}" target="_blank">Vist site</a>
          </div>
          <div class="col">
            <a href="#" class="expanded-bookmark-delete">Delete</a>
          </div>
        </div>
        
        <div class="form-group">
          <ul class="bookmark-rating">
            ${generateBookMarkElementRatingHelper(bookmark.rating)}
          </ul>
        </div>

      </form>
    </li>
    <hr>`;
  }

  function generateBookmarkElement(bookmark) {  
    return `
    <li data-item-id="${bookmark.id}">
      <form>
      
        <p><a class="bookmark-title-link" href="">${bookmark.title}</a></p>
        
        <div class="form-group">
          <ul class="bookmark-rating">
            ${generateBookMarkElementRatingHelper(bookmark.rating)}
          </ul>
        </div>


      </form>
    </li>
    <hr>`;
  }

  function generateBookMarkElementRatingHelper(rating) {
    let ratingList = [];
    let count = 0;
    for (let i = 0; i <= rating - 1; i++) {
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

  function generateBookmarkItems(bookmarksPreRender) {
    let bookmarksPostRender = [];
    
    bookmarksPreRender.forEach(bookmark => {
      if(bookmark.id === store.expanded) {
        bookmarksPostRender.push(generateBookmarkElementExpanded(bookmark));
      }

      if(bookmark.id !== store.expanded) {
        bookmarksPostRender.push(generateBookmarkElement(bookmark));
      }
    });

    return bookmarksPostRender;
  }

  function render() {
    $('#bookmarks-list').html('');
    if(store.error !== null) {
      $('#errors').css('display', 'block');
      //$('#errors').toggle();
      $('#error-message').text(store.error.message); 
    }
    if(store.error === null) {
      $('#errors').css('display', 'none');
    }

    // Filter on each call of render for the bookmarks we want
    //store.filterRating = 5;
    let bookmarksFiltered = store.bookmarks.filter( bookmark => bookmark.rating <= store.filterRating );
    
    const bookmarksRendered = generateBookmarkItems(bookmarksFiltered);
    $('#bookmarks-list').html(bookmarksRendered);
    
  }

  function getItemIdFromElement(item) {
    return $(item).closest('li').data('item-id');
  }

  function handleAddBookmark() {
    $('#add-bookmark').click((event) => {
      event.preventDefault();
      const newBookmarkHTML = generateAddBookmarkHTML();
      $('#bookmarks-add').html(newBookmarkHTML);
      render();
    });
  }
  
  function handleMinRating() {
    $('#rating').change(() => {
      store.filterRating = parseInt($('#rating').val());
      render();
    });
  }
  
  function handleSaveBookmark() {
    $('#bookmarks-add').on('click', '#create-bookmark-save', (event) => {
    //$('#bookmarks-add').on('submit', '#bookmark-form-add', (event) => {
      event.preventDefault();

      // Capture necessary data for new bookmark
      let title = $('#bookmark-title-add').val();
      let url = $('#bookmark-url-add').val();
      let description = $('#bookmark-description-add').val();
      let rating = $('input[name=rating]:checked').val();

      // Get rid of bookmark add section
      $('#bookmarks-add').html('');

      // Reset filter for proper render
      $('#rating').val(store.filterRating);

      // with bookmark.id being handled API side, not sure how to handle store.addbookmark
      // besides doing a full round trip ??

      // Completely wipe all bookmarks from both store and api
      store.bookmarks = [];
      // api.getBookmarks().then(bookmarks => {
      //   bookmarks.forEach(bookmark => api.deleteBookmark(bookmark.id));
      // });

      // Create new bookmark
      api.createBookmark(title, url, description, rating);
      // Get all bookmarks, regenerate everything
      api.getBookmarks()
        .then(bookmarks => {
          bookmarks.forEach(bookmark => store.addBookmark(bookmark));
        })
        .then(() => generateBookmarkItems(store.bookmarks))
        .then(() => render()); 
    });
  }
  
  function handleCancelBookmark() {
    $('#bookmarks-add').on('click', '#create-bookmark-cancel', event => {
      event.preventDefault();
      $('#bookmarks-add').html('');
      render();
    });
  }
  
  //expanded-bookmark-delete
  function handleDeleteBookmark() {
    $('#bookmarks-list').on('click', '.expanded-bookmark-delete', event => {
      event.preventDefault();
      let id = getItemIdFromElement(event.target);
      store.findAndDelete(id);
      api.deleteBookmark(id);
      render();
    });
  }
  
  function handleExpandBookmark() {
    $('#bookmarks-list').on('click', '.bookmark-title-link', event => {
      event.preventDefault();
      let id = getItemIdFromElement(event.target);
      store.setBookmarkExpanded(id);
      render();
    });
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
    generateBookmarkItems,
    render,
    bindEventListeners,
  };

}());
