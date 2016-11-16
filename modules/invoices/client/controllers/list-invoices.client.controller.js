(function () {
    'use strict';

    angular
        .module('invoices')
        .controller('InvoicesListController', InvoicesListController);

    InvoicesListController.$inject = ['InvoicesService', '$mdDialog'];

    function InvoicesListController(InvoicesService, $mdDialog) {
        var vm = this;

        vm.invoices = InvoicesService.query();

        vm.showPrompt = function () {
            var confirm = $mdDialog.prompt()
                .title('Escoge un timesheet')
                .textContent('Antes de empezar con tu carga nos gustaría saber tu nombre')
                .placeholder('Tú nombre')
                .ariaLabel('Tú nombre')
                .ok('¡Listo!');

            $mdDialog.show(confirm).then(function (result) {
                if (result !== undefined) {

                } else {
                    vm.showPrompt();
                }
            }, function () {
                vm.showPrompt();
            });
        };

    }
}());
