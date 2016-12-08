// Invoices service used to communicate Invoices REST endpoints
(function () {
  'use strict';

  angular
    .module('invoices')
    .factory('InvoicesService', InvoicesService);

  InvoicesService.$inject = ['$resource'];

  function InvoicesService($resource) {
    return $resource('api/invoices/:invoiceId', {
      invoiceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
