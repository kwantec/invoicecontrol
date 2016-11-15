(function () {
  'use strict';

  // Signs controller
  angular
    .module('signs')
    .controller('SignsController', SignsController);

  SignsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'signResolve'];

  function SignsController ($scope, $state, $window, Authentication, sign) {
    var vm = this;

    vm.authentication = Authentication;
    vm.sign = sign;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Sign
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.sign.$remove($state.go('signs.list'));
      }
    }

    // Save Sign
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.signForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.sign._id) {
        vm.sign.$update(successCallback, errorCallback);
      } else {
        vm.sign.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('signs.view', {
          signId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
