/**
 * Created by Andre on 29/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesClientController', EmployeesClientController);

    EmployeesClientController.$inject = ['$scope', '$resource', '$stateParams', 'Employees', '$location', '$mdToast'];

    function EmployeesClientController($scope, $resource, $stateParams, Employees, $location, $mdToast) {
        //$scope.initNewEmployee();


        var Employee = $resource('/api/employees');

        $scope.addEmployee = function () {
            Employee.save($scope.newEmployee, function () {
                $scope.initNewEmployee();
                $scope.showToastSave();
            });
        };

        $scope.findEmployee = function () {
            Employees.get(
                {employeeId: $stateParams.employeeId},
                function (employee) {
                    employee.dob = new Date(employee.dob);
                    $scope.employee = employee;
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.update = function () {
            var employee = $scope.employee;
            employee.$update(function () {
                $location.path('employees/' + employee._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.removeEmployee = function () {
            $scope.employee.$delete(
                {employeeId: $stateParams.employeeId},
                function () {
                    $location.path('employees/list');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Employee Succesfully Deleted!')
                            .hideDelay(3000)
                    );
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.showToastSave = function () {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Employee Created!')
                    .hideDelay(3000)
            );
        };

        var Users = $resource('/api/users');
        $scope.userData = {
            userList: Users.query()
        };

        $scope.initNewEmployee = function () {

            $scope.newEmployee = {};
            $scope.newEmployee.name = "";
            $scope.newEmployee.lastName = "";
            $scope.newEmployee.address = {};
            $scope.newEmployee.address.city = "";
            $scope.newEmployee.address.state = "";
            $scope.newEmployee.address.country = "";
            $scope.newEmployee.address.zipCode = "";
            $scope.newEmployee.personEmail = "";
            $scope.newEmployee.workEmail = "";
            $scope.newEmployee.rfc = "";
            $scope.newEmployee.imss = "";
            $scope.newEmployee.curp = "";
            $scope.newEmployee.picture = "";
            $scope.newEmployee.user = "";
            return 0;
        };
    }
}());
