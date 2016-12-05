(function () {
    'use strict';

    /*Código original------------------------------
     angular
     .module('invoices')
     .controller('InvoicesListController', InvoicesListController);

     InvoicesListController.$inject = ['InvoicesService', '$mdDialog', '$scope'];

     function InvoicesListController(InvoicesService, $mdDialog, $scope) {
     var vm = this;

     vm.invoices = InvoicesService.query();

     vm.showPrompt = function ($event) {
     var parentEl = angular.element(document.body);
     $mdDialog.show({
     parent: parentEl,
     targetEvent: $event,
     templateUrl: 'modules/invoices/client/views/modal.pick.timesheet.html',
     locals: {},
     controller: DialogController
     });
     };

     function DialogController($scope, $mdDialog) {
     $scope.closeDialog = function () {
     $mdDialog.hide();
     };

     $scope.hasChanged = function () {
     console.log($scope.selected);
     };

     $scope.fieldTable = [1,2,3,4];
     }

     }
     -------------------------------------------------------------*/

    angular
        .module('timesheets')
        .controller('TimesheetsListController', TimesheetsListController);

    TimesheetsListController.$inject = ['TimesheetsService'];

    angular
        .module('invoices')
        .controller('InvoicesListController', InvoicesListController);

    InvoicesListController.$inject = ['TimesheetsService', 'InvoicesService', '$mdDialog', '$scope'];

    //angular.module("CombineModule", ["timesheets", "invoices"]);

    function TimesheetsListController(TimesheetsService) {
        var vm = this;
        vm.timesheets = TimesheetsService.query();
    }

    function InvoicesListController(TimesheetsService, InvoicesService, $mdDialog) {
        var vm = this;

        vm.invoices = InvoicesService.query();

        vm.timesheets = TimesheetsService.query();

        vm.showPrompt = function ($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'modules/invoices/client/views/modal.pick.timesheet.html',
                locals: {},
                controller: DialogController
            });
        };

        function DialogController($scope, $mdDialog, $state) {
            $scope.closeDialog = function () {
                $mdDialog.hide();
            };

            $scope.hasChanged = function () {
                //console.log($scope.selected._id);
                $scope.closeDialog();
                $state.go('invoices.create', {
                    timesheetId: $scope.selected._id
                });
            };

            $scope.fieldTable = vm.timesheets;
        }
    }
}());
