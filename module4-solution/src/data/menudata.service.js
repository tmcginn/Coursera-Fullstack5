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

      // service.getItemsForCategory = function(categoryShortName) {
      service.getItemsForCategory = function(menu_cat) {
        var categoryShortName = menu_cat.short_name;
        var menu_items_list = {
          name: menu_cat.name,
          short_name: menu_cat.short_name,
          menu_items: []
        }
        // var menu_items = [];
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
          params: { category: categoryShortName }
        })
        .then(function(response) {
          for (var i = 0; i < response.data.menu_items.length; i++) {
            // menu_items.push (response.data.menu_items[i]);
            menu_items_list.menu_items.push (response.data.menu_items[i]);
          }
          // return menu_items;
          return menu_items_list;
        })
      };

    }
  })();
