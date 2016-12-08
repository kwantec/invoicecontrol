(function () {
  'use strict';

  angular
    .module('signs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('signs', {
        abstract: true,
        url: '/signs',
        template: '<ui-view/>'
      })
      .state('signs.list', {
        url: '',
        templateUrl: 'modules/signs/client/views/list-signs.client.view.html',
        controller: 'SignsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signs List'
        }
      })
      .state('signs.create', {
        url: '/create',
        templateUrl: 'modules/signs/client/views/form-sign.client.view.html',
        controller: 'SignsController',
        controllerAs: 'vm',
        resolve: {
          signResolve: newSign
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Signs Create'
        }
      })
      .state('signs.edit', {
        url: '/:signId/edit',
        templateUrl: 'modules/signs/client/views/form-sign.client.view.html',
        controller: 'SignsController',
        controllerAs: 'vm',
        resolve: {
          signResolve: getSign
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Sign {{ signResolve.name }}'
        }
      })
      .state('signs.view', {
        url: '/:signId',
        templateUrl: 'modules/signs/client/views/view-sign.client.view.html',
        controller: 'SignsController',
        controllerAs: 'vm',
        resolve: {
          signResolve: getSign
        },
        data: {
          pageTitle: 'Sign {{ signResolve.name }}'
        }
      });
  }

  getSign.$inject = ['$stateParams', 'SignsService'];

  function getSign($stateParams, SignsService) {
    return SignsService.get({
      signId: $stateParams.signId
    }).$promise;
  }

  newSign.$inject = ['SignsService'];

  function newSign(SignsService) {
    return new SignsService();
  }
}());
