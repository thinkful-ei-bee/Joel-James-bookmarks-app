'use strict';

/* global store, api*/

const bookmarkList = (function() {

  function generateAddBookmarkHTML() {
    return `
    <form>
      <p>Create a Bookmark</p>
      <div class="bookmark-title">

        <div class="form-group">
          <div class="col">
              <label for="bookmark-title-add">Title:</label>
              <input id="bookmark-title-add" type="text" value="testerin">
          </div>
          <div class="col">
            <label for="bookmark-url-add">Url:</label>
            <input id="bookmark-url-add" type="text" value="http://testerin.com">
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
            <li><input type="radio" name="rating" value="" checked>1<br></li>
            <li><input type="radio" name="rating" value="" checked>2<br></li>
            <li><input type="radio" name="rating" value="" checked>3<br></li>
            <li><input type="radio" name="rating" value="" checked>4<br></li>
            <li><input type="radio" name="rating" value="" checked>5<br></li>
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

  function generateBookmarkItems() {
    const bookmarks = [];
    
    store.bookmarks.forEach(bookmark => {
      if(bookmark.id === store.expanded) {
        bookmarks.push(generateBookmarkElementExpanded(bookmark));
      }

      if(bookmark.id !== store.expanded) {
        bookmarks.push(generateBookmarkElement(bookmark));
      }
    });

    return bookmarks;
  }

  function render() {
    if(store.error !== null) {
      $('#errors').css('display', 'block');
      //$('#errors').toggle();
      $('#error-message').text(store.error.message); 
    }

    // Filter on each call of render for the bookmarks we want
    let bookmarks = store.bookmarks.filter( bookmark => bookmark.rating <= store.filterRating );

    const html = generateBookmarkItems(bookmarks);
    $('#bookmarks-list').html(html);
    
  }

  function getItemIdFromElement(item) {
    return $(item).closest('li').data('item-id');
  }

  function handleAddBookmark() {
    $('#add-bookmark').click((event) => {
      event.preventDefault();
      const newBookmarkHTML = generateAddBookmarkHTML();
      $('#bookmarks-add').html(newBookmarkHTML);
      // handleSaveBookmark();
      // handleCancelBookmark();
      render();
    });
  }
  
  function handleMinRating() {
    $('#rating').change(() => {
      store.filterRating = $('#rating').val();
      render();
    });
  }
  
  function handleSaveBookmark() {
    $('#bookmarks-add').on('click', '#create-bookmark-save', (event) => {
      event.preventDefault();
      let title = $('#bookmark-title-add').val();
      let url = $('#bookmark-url-add').val();
      let description = $('#bookmark-description-add').val();
      console.log(` ${title} ${url} ${description} `);
      api.createBookmark(title, url, description);
      
    });
  }
  
  function handleCancelBookmark() {
    $('#bookmarks-add').on('click', '#create-bookmark-cancel', event => {
      event.preventDefault();
      $('#bookmarks-add').html('');
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
