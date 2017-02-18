(function() {
  "use strict";

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'SignupService']

  function SignupController(MenuService, SignupService) {
    var reg = this;

    reg.invalidCategory = false;
    reg.checked = false;
    reg.saved = false;

    // Get the current values (if any)
    reg.user = SignupService.getPreference();

    reg.checkCategoryName = function() {
      reg.invalidCategory = false;
      // Skip the function if still undefined (new)
      if (reg.user) {
        // uppercase the string
        reg.user.short_name = reg.user.short_name.toUpperCase();
        var items = MenuService.getMenuItem(reg.user.short_name)
          .then(function(item) {
            if (item.short_name) {
              reg.checked = true;
              reg.user.item = item;
            } else {
              reg.invalidCategory = true;
            }
          })
      }
    };

    reg.submit = function() {
      SignupService.savePreference(reg.user);
      reg.saved = true;
    }
  }

})();
