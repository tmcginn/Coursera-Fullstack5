(function() {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemDetailController', ItemDetailController);

  ItemDetailController.$inject = ['items'];
  function ItemDetailController(items) {
    var itemDetail = this;
    // itemDetail.items = items;
    itemDetail.name = items.name;
    itemDetail.short_name = items.short_name;
    itemDetail.items = items.menu_items;
  }

})();
