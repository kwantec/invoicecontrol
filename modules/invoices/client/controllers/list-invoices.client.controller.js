(function () {
  'use strict';

  angular
    .module('invoices')
    .controller('InvoicesListController', InvoicesListController);

  InvoicesListController.$inject = ['InvoicesService', '$mdDialog'];

  function InvoicesListController(InvoicesService, $mdDialog) {
    var vm = this;

    vm.invoices = InvoicesService.query();

      vm.showPrompt = function() {
          var confirm = $mdDialog.prompt()
              .title('Escoge un timesheet')
              .textContent('Antes de empezar con tu carga nos gustaría saber tu nombre')
              .placeholder('Tú nombre')
              .ariaLabel('Tú nombre')
              .ok('¡Listo!');

          $mdDialog.show(confirm).then(function (result) {
              if (result !== undefined) {
                  vm.student = student;
                  vm.student.name = result;
                  vm.student.$save(vm.student, function (response) {
                      console.log(response);
                      vm.student._id = response._id;
                      vm.student.periods = [];
                  });
                  console.log(vm.student);
              } else {
                  showPrompt();
              }
          }, function () {
              showPrompt();
          });
      }

  }
}());
