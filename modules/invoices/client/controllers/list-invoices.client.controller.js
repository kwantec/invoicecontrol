(function () {
    'use strict';

    angular
        .module('timesheets')
        .controller('TimesheetsListController', TimesheetsListController);

    TimesheetsListController.$inject = ['TimesheetsService'];

    angular
        .module('invoices')
        .controller('InvoicesListController', InvoicesListController);

    InvoicesListController.$inject = ['TimesheetsService', 'InvoicesService', '$mdDialog', '$scope'];

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
                $scope.closeDialog();
                $state.go('invoices.create', {
                    timesheetId: $scope.selected._id
                });
            };

            $scope.fieldTable = vm.timesheets;
        }
    }
}());
