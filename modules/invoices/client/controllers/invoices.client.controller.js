(function () {
  'use strict';

  // Invoices controller
  angular
    .module('invoices')
    .controller('InvoicesController', InvoicesController);

  InvoicesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'invoiceResolve', 'timesheetResolve', '$sce'];

  function InvoicesController ($scope, $state, $window, Authentication, invoice, timesheet, $sce) {

    var vm = this;

    vm.authentication = Authentication;
    vm.invoice = invoice;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.hasChanged = hasChanged;

    vm.invoice.teamName = timesheet.teamName;
    vm.invoice.workDaysInPeriod= timesheet.workDaysInPeriod;
    vm.invoice.workDaysInMonth = timesheet.workDaysInMonth;
    vm.invoice.finishDate = new Date(timesheet.finishDate);
    vm.invoice.startDate =  new Date(timesheet.startDate);
    vm.invoice.employees = timesheet.employees;    

    

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

    function hasChanged(){
      
      vm.invoice.totalDiscount = 0;
      vm.invoice.totalChargesDiscount = 0;
      vm.invoice.totalChargesNoDiscount = 0;
      angular.forEach(vm.invoice.employees, function(value, key){
        //console.log(key + ': ' + value.billing.currentPeriodCharges);
        vm.invoice.totalChargesNoDiscount += value.billing.currentPeriodCharges;
        vm.invoice.totalDiscount += value.billing.discount;
        value.billing.totalPeriodCharges = 
          value.billing.currentPeriodCharges - (value.billing.currentPeriodCharges*(value.billing.discount/100));
        vm.invoice.totalChargesDiscount += value.billing.totalPeriodCharges;
      });
    }

  }

  /*$scope.hasChanged = function () {
    angular.forEach(vm.invoice.employees, function(value, key){
     console.log(key + ': ' + value.billing.currentPeriodCharges);
    });
  };*/

}());
