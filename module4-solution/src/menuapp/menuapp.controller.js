(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppController', MenuAppController);

MenuAppController.$inject = ['MenuDataService', 'items'];
function MenuAppController(MenuDataService, items) {
  var menuList = this;
  menuList.items = items;
}

})();
