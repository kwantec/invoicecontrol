(function () {
  'use strict';

  // Invoices controller
  angular
    .module('invoices')
    .controller('InvoicesController', InvoicesController);

  InvoicesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'invoiceResolve', 'timesheetResolve'];

  function InvoicesController ($scope, $state, $window, Authentication, invoice, timesheet) {
    var vm = this;

    vm.authentication = Authentication;
    vm.invoice = invoice;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    //vm.timesheet = timesheet;
    

    vm.invoice.teamName = timesheet.teamName;
    vm.invoice.workDaysInPeriod= timesheet.workDaysInPeriod;
    vm.invoice.workDaysInMonth = timesheet.workDaysInMonth;
    vm.invoice.finishDate = new Date(timesheet.finishDate);
    vm.invoice.startDate =  new Date(timesheet.startDate);
    vm.invoice.employees = timesheet.employees;
    console.log(timesheet.employees[0]);


    // Remove existing Invoice
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.invoice.$remove($state.go('invoices.list'));
      }
    }

    // Save Invoice
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.invoiceForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.invoice._id) {
        vm.invoice.$update(successCallback, errorCallback);
      } else {
        vm.invoice.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('invoices.view', {
          invoiceId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
