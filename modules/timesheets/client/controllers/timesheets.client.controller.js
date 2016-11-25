(function () {
  'use strict';

  // Timesheets controller
  angular
    .module('timesheets')
    .controller('TimesheetsController', TimesheetsController);

  TimesheetsController.$inject = ['$scope', '$state', '$resource', '$window', 'Authentication', 'timesheetResolve', '$mdToast'];

  function TimesheetsController ($scope, $state, $resource,$window, Authentication, timesheet, $mdToast) {
    var vm = this;

    $scope.newTimesheet = {};
    $scope.newTimesheet.name = "";
    $scope.newTimesheet.startDate = "";
    $scope.newTimesheet.finishDate = "";
    $scope.newTimesheet.teamName = "";

    vm.authentication = Authentication;
    vm.timesheet = timesheet;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    var Timesheet = $resource('/api/timesheets');

    $scope.addTimesheet = function () {
      console.log($scope.newTimesheet);
      Timesheet.save($scope.newTimesheet, function () {
        $scope.newTimesheet = {};
        $scope.newTimesheet.name = "";
        $scope.newTimesheet.startDate = "";
        $scope.newTimesheet.finishDate = "";
        $scope.newTimesheet.teamName = "";
        $scope.showToastSave();
        console.log("Timesheet saved");
      });
    };

    $scope.showToastSave = function () {
      $mdToast.show(
          $mdToast.simple()
              .textContent('Timesheet Created!')
              .hideDelay(3000)
      );
    };

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
