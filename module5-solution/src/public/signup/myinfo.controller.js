(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignupService']
function MyInfoController(SignupService) {
  var info = this;

  info.userpref = SignupService.getPreference();
}
})();
