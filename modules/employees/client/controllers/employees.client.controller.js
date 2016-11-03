(function () {
  'use strict';

  // Employees controller
  //noinspection JSAnnotator
  angular
    .module('employees')
    .controller('EmployeesController', EmployeesController);

  EmployeesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'employeeResolve'];

  function EmployeesController ($scope, $state, $window, Authentication, employee) {
    var vm = this;

    vm.authentication = Authentication;
    vm.employee = employee;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Employee
    function remove() {

      swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this employee!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false },
          function(isConfirm){
            if (isConfirm) {
              swal("Deleted!", "Your employee has been deleted.", "success");
              vm.employee.$remove($state.go('employees.list'));
            } else {
              swal("Cancelled", "Your employee is safe :)", "error");
            }
          });
    }

    // Save Employee
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.employee._id) {
        vm.employee.$update(successCallback, errorCallback);
      } else {
        vm.employee.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('employees.view', {
          employeeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
