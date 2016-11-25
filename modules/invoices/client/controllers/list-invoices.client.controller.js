(function () {
    'use strict';

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
}());
