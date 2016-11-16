(function () {
  'use strict';

  angular
    .module('loggies')
    .controller('LoggiesListController', LoggiesListController);

  LoggiesListController.$inject = ['LoggiesService'];

  function LoggiesListController(LoggiesService) {
    var vm = this;

    vm.loggies = LoggiesService.query();
  }
}());
