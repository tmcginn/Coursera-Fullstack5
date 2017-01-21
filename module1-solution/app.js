(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.placeholder = "list comma separated dishes you usually have for lunch";
  $scope.lunchDishes = "";
  $scope.message = "";
  $scope.buttonLabel = "Check If Too Much";

  $scope.checkDishes = function () {
    if ($scope.lunchDishes == "") {
      $scope.message = "Please enter at least one dish";
    }
    else {
      // This regular expressions removes spaces from the splits
      var re = /\s*,\s*/;
      var dishes = $scope.lunchDishes.split(re);
      var dishCount = 0;
      // Count the dishes and ignore blanks
      for (var i = 0; i < dishes.length; i++) {
        if (dishes[i] != "") {
          dishCount++;
        }
      }
      if (dishCount <= 3) {
        $scope.message = "Enjoy!";
      }
      else {
        $scope.message = "Too much!";
      }

    };
  };

  };
})();
