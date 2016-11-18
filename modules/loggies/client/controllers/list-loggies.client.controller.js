(function () {
  'use strict';

  angular
      .module('loggies',['materialCalendar','ngMaterial'])
    .controller('LoggiesListController', LoggiesListController);

  LoggiesListController.$inject = ['LoggiesService'];

  function LoggiesListController(LoggiesService) {
    var vm = this;



    vm.loggies = LoggiesService.query();
  }



}());
