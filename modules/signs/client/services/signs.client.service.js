// Signs service used to communicate Signs REST endpoints
(function () {
  'use strict';

  angular
    .module('signs')
    .factory('SignsService', SignsService);

  SignsService.$inject = ['$resource'];

  function SignsService($resource) {
    return $resource('api/signs/:signId', {
      signId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
