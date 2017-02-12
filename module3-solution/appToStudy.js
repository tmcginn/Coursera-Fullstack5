(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  $scope.searchTerm = "";

  var narrower = this;

  narrower.found = [];
  narrower.nothingFound = false;

  narrower.narrowIt = function() {
    if ($scope.searchTerm.trim().length == 0) {
      narrower.nothingFound = true;
      narrower.found = [];
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
    promise.then(function (response) {
      narrower.found = response;
      narrower.nothingFound = (response.length == 0);
    });
  };

  narrower.removeItem = function(index) {
    narrower.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (response) {
      var foundItems = [];
      response.data.menu_items.forEach(function(item, index, array) {
        if (item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          foundItems.push(item);
        }
      })
      return foundItems;
    });
  }
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'found-items.html',
    scope: {
      found: '<',
      nothingFound: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

})();
