(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['MenuService', 'SignupService']
function RegistrationController(MenuService, SignupService) {
  var reg = this;

  reg.invalidCategory = false;
  reg.checked = false;
  reg.saved = false;

  reg.checkCategoryName = function () {
    reg.invalidCategory = false;
    console.log("data: " + reg.user.short_name);
    var items = MenuService.getMenuItems(reg.user.short_name)
    .then (function(items) {
      if (items.menu_items.length > 0) {
        console.log("good: " + items.menu_items);
        reg.checked = true;
      } else {
        console.log("no good");
        reg.invalidCategory = true;
      }
    })
  };

  reg.submit = function () {
    // should not happen
    if (reg.invalidCategory) {
      return false;
    }
    // Create an object to save as a preference
    // var preferences = {};
    // preferences.firstname = reg.user.firstname;
    // preferences.lastname = reg.user.lastname;
    // preferences.email = reg.user.email;
    // preferences.phone = reg.user.phone;
    // preferences.short_name = reg.user.short_name;

    console.log("submitted: " + reg.user.email);
    SignupService.savePreference(reg.user);
    reg.saved = true;
  }
}

})();
