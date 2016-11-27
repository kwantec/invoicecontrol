(function () {
    'use strict';

    // Loggies controller
    angular
        .module('loggies')
        .controller('LoggiesController', LoggiesController);

    LoggiesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'loggyResolve', '$stateParams', '$mdDialog', '$mdDialog', '$filter'];

    function LoggiesController($scope, $state, $window, Authentication, loggy, $stateParams, $mdDialog, $filter) {
        var vm = this;

        vm.authentication = Authentication;
        vm.loggy = loggy;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;

        $scope.loggyDate = $stateParams.loggyDate;

        $scope.showDialog = showDialog;

        function showDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                template:
                '<div style="width:50%; height: 50%;">' +
                '<md-dialog aria-label="List dialog">' +
                '  <md-dialog-content>' +
                '</br>' +
                '<label>&nbsp;&nbsp;&nbsp;&nbsp;Confirmas esta actividad del '+ $scope.loggyDate +'  </label>' +
                '<md-input-container layout-gt-xs="row">' +
                '<textarea style="width : 405%;" rows=5 readonly>&nbsp;&nbsp;&nbsp;&nbsp;' + vm.loggy.activity + '</textarea>' +
                '</br>' +
                '</md-input-container>' +
                '  </md-dialog-content>' +
                '  <md-dialog-actions>' +
                    '<div style="position: absolute; left : 0; bottom : 0;">'+
                '    <md-button ng-click="closeDialog()" class="md-primary">' +
                '      Cerrar' +
                '    </md-button>' +
                    '</div>'+
                '    <md-button ng-click="save(vm.form.loggyForm.$valid)" class="md-raised md-primary">Confirmar</md-button>' +
                '  </md-dialog-actions>' +
                '</md-dialog>' +
                    '</div>',
                locals: {
                },
                controller: DialogController
            });
        }

        function DialogController($scope, $mdDialog, $filter) {
            $scope.closeDialog = function () {
                $mdDialog.hide();
            }

            // Save Loggy
            $scope.save = function() {
                // TODO: move create/update logic to service
                if (vm.loggy._id) {
                    vm.loggy.$update(successCallback, errorCallback);
                } else {
                    $scope.loggyDate = $stateParams.loggyDate;
                    $scope.newDate = new Date($scope.loggyDate+'T12:00:00');
                    vm.loggy.created = $filter("date")($scope.newDate, 'MMM d, y');
                    vm.loggy.$save(successCallback, errorCallback);
                }

                function successCallback(res) {
                    $state.go('loggies.view', {
                        loggyId: res._id
                    });
                }

                function errorCallback(res) {
                    vm.error = res.data.message;
                }
                $mdDialog.hide();
            }
        }

        // Remove existing Loggy
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.loggy.$remove($state.go('loggies.list'));
            }
        }

        // Save Loggy
        function save(isValid,$event) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.loggyForm');
                return false;
            }else{
                $scope.showDialog($event);
            }
        }
    }
}());
