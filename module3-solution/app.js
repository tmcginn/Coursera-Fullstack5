(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundList', FoundList);


  function FoundList() {
    var ddo = {
      templateUrl: 'foundList.html',
      scope: {
        list: '<',
        title: '@title'
      }
    };

    return ddo;
  }


  // Narrow It Down Controller
  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var list = this;

    list.searchTerm = "";

    list.getFound = function() {
      MenuSearchService.getMatchedMenuItems(list.searchTerm);
    };

    list.foundItems = MenuSearchService.getFoundItems();

    list.removeItem = function(index) {
      MenuSearchService.removeItem(index);
    };

    list.nothingFound = function() {
      list.errorMessage = MenuSearchService.errorMessage();
      return MenuSearchService.nothingFound();
    };

  }

  // Menu Search service
  MenuSearchService.$inject = ['$q', '$http', 'ApiBasePath'];

  function MenuSearchService($q, $http, ApiBasePath) {
    var service = this;

    var foundItems = [];
    var menuItems = [];
    var nothingFound = true;
    var errorMessage = "";

    service.getMatchedMenuItems = function(searchTerm) {
      service.matchSearchItems(searchTerm)
        .then(function(response) {})
        .catch(function(error) {
          console.log(error);
        })
    }

    service.getMenuItems = function() {
      var deferred = $q.defer();
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      });
      deferred.resolve(response);
      return deferred.promise;
    };

    service.matchSearchItems = function(searchTerm) {
      // reset the foundItems array
      foundItems.length = 0;
      nothingFound = true;
      errorMessage = "";
      var promise = service.getMenuItems();

      return promise
        .then(function(response) {
          // Skip the for loop altogether if the searchTerm is blank
          if (searchTerm !== "") {
            for (var i = 0; i < response.data.menu_items.length; i++) {
              var item = response.data.menu_items[i];
              if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                var menuItem = {
                  name: item.name,
                  short_name: item.short_name,
                  description: item.description
                };
                foundItems.push(menuItem);
                nothingFound = false;
              }
            }
          }
          if (foundItems.length == 0) {
            errorMessage = "Nothing Found!";
          }
          return foundItems;
        })
    };

    service.getFoundItems = function() {
      return foundItems;
    }

    service.removeItem = function(index) {
      foundItems.splice(index, 1);
    }

    service.nothingFound = function() {
      return nothingFound;
    }

    service.errorMessage = function() {
      return errorMessage;
    }

  }

})();
