(function () {
  'use strict';

  // Loggies controller
  angular
    .module('loggies')
    .controller('LoggiesController', LoggiesController);

  LoggiesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'loggyResolve'];

  function LoggiesController ($scope, $state, $window, Authentication, loggy) {
    var vm = this;

    vm.authentication = Authentication;
    vm.loggy = loggy;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Loggy
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.loggy.$remove($state.go('loggies.list'));
      }
    }

    // Save Loggy
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.loggyForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.loggy._id) {
        vm.loggy.$update(successCallback, errorCallback);
      } else {
        vm.loggy.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('loggies.view', {
          loggyId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
