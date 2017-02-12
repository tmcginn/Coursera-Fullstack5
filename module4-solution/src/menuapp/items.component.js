(function () {
'use strict';

angular.module('MenuApp')
.component('menuitems', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
