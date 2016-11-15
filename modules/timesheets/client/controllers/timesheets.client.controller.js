(function () {
  'use strict';

  // Timesheets controller
  angular
    .module('timesheets')
    .controller('TimesheetsController', TimesheetsController);

  TimesheetsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'timesheetResolve'];

  function TimesheetsController ($scope, $state, $window, Authentication, timesheet) {
    var vm = this;

    vm.authentication = Authentication;
    vm.timesheet = timesheet;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Timesheet
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.timesheet.$remove($state.go('timesheets.list'));
      }
    }

    // Save Timesheet
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.timesheetForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.timesheet._id) {
        vm.timesheet.$update(successCallback, errorCallback);
      } else {
        vm.timesheet.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('timesheets.view', {
          timesheetId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
