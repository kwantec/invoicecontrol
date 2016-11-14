(function () {
  'use strict';

  angular
    .module('invoices')
    .controller('InvoicesListController', InvoicesListController);

  InvoicesListController.$inject = ['InvoicesService'];

  function InvoicesListController(InvoicesService) {
    var vm = this;

    vm.invoices = InvoicesService.query();
  }
}());
