(function () {
  'use strict';

  angular
    .module('signs')
    .controller('SignsListController', SignsListController);

  SignsListController.$inject = ['SignsService'];

  function SignsListController(SignsService) {
    var vm = this;

    vm.signs = SignsService.query();
  }
}());
