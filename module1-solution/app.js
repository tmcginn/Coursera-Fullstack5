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
  $scope.textColor = "red";

  $scope.checkDishes = function () {
    if ($scope.lunchDishes == "") {
      $scope.textColor = "red";
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
      console.log(dishCount);
      if (dishCount == 0) {
        $scope.textColor = "red";
        $scope.message = "Please enter at least one dish";
      }
      else if (dishCount <= 3) {
        $scope.textColor = "green";
        $scope.message = "Enjoy!";
      }
      else {
        $scope.textColor = "blue";
        $scope.message = "Too much!";
      }

    };
  };

  };
})();
