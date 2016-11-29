(function () {
  'use strict';

  angular
    .module('timesheets')
    .controller('TimesheetsListController', TimesheetsListController);

  TimesheetsListController.$inject = ['TimesheetsService'];

  function TimesheetsListController(TimesheetsService) {
    var vm = this;

    vm.timesheets = TimesheetsService.query();
  }
}());
