(function () {
  'use strict';

  angular
    .module('employees')
    .controller('EmployeesListController', EmployeesListController);

  EmployeesListController.$inject = ['EmployeesService'];

  function EmployeesListController(EmployeesService) {
    var vm = this;

    vm.employees = EmployeesService.query();
  }
}());
