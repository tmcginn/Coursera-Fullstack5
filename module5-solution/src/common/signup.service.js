(function () {
"use strict";

angular.module('common')
.service('SignupService', SignupService);

function SignupService() {
  var service = this;

  service.savePreference = function(preference) {
    service.preference = preference;
  }

  service.getPreference = function() {
    return service.preference;
  }
}

})();
