(function () {
  'use strict';

  angular
    .module('invoices')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('invoices', {
        abstract: true,
        url: '/invoices',
        template: '<ui-view/>'
      })
      .state('invoices.list', {
        url: '',
        templateUrl: 'modules/invoices/client/views/list-invoices.client.view.html',
        controller: 'InvoicesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Invoices List'
        }
      })
      .state('invoices.create', {
        url: '/create',
        templateUrl: 'modules/invoices/client/views/form-invoice.client.view.html',
        controller: 'InvoicesController',
        controllerAs: 'vm',
        resolve: {
          invoiceResolve: newInvoice
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Invoices Create'
        }
      })
      .state('invoices.edit', {
        url: '/:invoiceId/edit',
        templateUrl: 'modules/invoices/client/views/form-invoice.client.view.html',
        controller: 'InvoicesController',
        controllerAs: 'vm',
        resolve: {
          invoiceResolve: getInvoice
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Invoice {{ invoiceResolve.name }}'
        }
      })
      .state('invoices.view', {
        url: '/:invoiceId',
        templateUrl: 'modules/invoices/client/views/view-invoice.client.view.html',
        controller: 'InvoicesController',
        controllerAs: 'vm',
        resolve: {
          invoiceResolve: getInvoice
        },
        data: {
          pageTitle: 'Invoice {{ invoiceResolve.name }}'
        }
      });
  }

  getInvoice.$inject = ['$stateParams', 'InvoicesService'];

  function getInvoice($stateParams, InvoicesService) {
    return InvoicesService.get({
      invoiceId: $stateParams.invoiceId
    }).$promise;
  }

  newInvoice.$inject = ['InvoicesService'];

  function newInvoice(InvoicesService) {
    return new InvoicesService();
  }
}());
