(function() {
    'use strict';

    angular.module('Data')
      .service('MenuDataService', MenuDataService)
      .constant('ApiBasePath',
      "https://davids-restaurant.herokuapp.com");

    MenuDataService.$inject = ['$http', 'ApiBasePath']
    function MenuDataService($http, ApiBasePath) {
      var service = this;

      service.getAllCategories = function() {
        var categoryList = [];
        return $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
          })
          .then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
              categoryList.push(response.data[i]);
            }
            return categoryList;
          })
      };

      service.getItemsForCategory = function(categoryShortName) {
        var menu_items = [];
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
          params: { category: categoryShortName }
        })
        .then(function(response) {
          for (var i = 0; i < response.data.menu_items.length; i++) {
            menu_items.push (response.data.menu_items[i]);
          }
          return menu_items;
        })
      };

    }
  })();
