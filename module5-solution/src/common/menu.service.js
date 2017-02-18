(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  // Return a single menu item given a short_name
  service.getMenuItem = function (short_name) {
    var menu_item = {};
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
      for (var i = 0; i < response.data.menu_items.length; i++) {
        if (response.data.menu_items[i].short_name == short_name) {
          menu_item = response.data.menu_items[i];
        }
      }
      return menu_item;
    });
  };

}



})();
