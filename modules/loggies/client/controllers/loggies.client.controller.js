(function () {
    'use strict';

    // Loggies controller
    angular
        .module('loggies')
        .controller('LoggiesController', LoggiesController);

    LoggiesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'loggyResolve', '$stateParams', '$mdDialog', '$mdDialog'];

    function LoggiesController($scope, $state, $window, Authentication, loggy, $stateParams, $mdDialog) {
        var vm = this;

        vm.authentication = Authentication;
        vm.loggy = loggy;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;

        $scope.showDialog = showDialog;

        console.log(vm.loggy.activity);

        function showDialog($event) {
            var parentEl = angular.element(document.body);
            var activity_name = document.getElementById("activity").value;
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                template: '<md-dialog aria-label="List dialog">' +
                '  <md-dialog-content>' +
                '<form name="vm.form.loggyForm" class="form-horizontal" ng-submit="vm.save(vm.form.loggyForm.$valid)">' +
                '<label>Confirmas esta actividad: </label>' +
                '<md-input-container layout-gt-xs="row">' +
                '<label>Actividad:</label>' +
                ' <input type="text" ng-model="vm.loggy.activity" value="' + $scope.Actividad + '" title="Activity" required>' +
                '<div ng-messages="vm.form.loggyForm.activity.$error" role="alert">' +
                ' <p class="help-block error-text" ng-message="required">Loggy activity is required.</p>' +
                '</div>' +
                '</md-input-container>' +
                '    <md-button type="submit" class="md-raised md-primary">Confirmar</md-button>' +
                '   <div ng-show="vm.error" class="text-danger">' +
                '  <strong ng-bind="vm.error"></strong>' +
                ' </div>' +
                    '<form>' +
                '  </md-dialog-content>' +
                '  <md-dialog-actions>' +
                '    <md-button ng-click="closeDialog()" class="md-primary">' +
                '      Close Dialog' +
                '    </md-button>' +
                '  </md-dialog-actions>' +
                '</md-dialog>',
                locals: {
                },
                controller: DialogController
            });
        }

        function DialogController($scope, $mdDialog) {
            $scope.Actividad = document.getElementById("activity").value;
            $scope.closeDialog = function () {
                $mdDialog.hide();
            }
        }

        $scope.loggyDate = $stateParams.loggyDate;

        // Remove existing Loggy
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.loggy.$remove($state.go('loggies.list'));
            }
        }

        // Save Loggy
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.loggyForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.loggy._id) {
                vm.loggy.$update(successCallback, errorCallback);
            } else {
                vm.loggy.created = $scope.loggyDate;
                console.log(vm.loggy.created);
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
        }
    }
}());
