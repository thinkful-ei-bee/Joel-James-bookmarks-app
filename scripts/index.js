'use strict';

$(function() {
  bookmarkList.bindEventListeners();

  api.getItems((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarkList.render();
  });
});