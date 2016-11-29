/**
 * Created by Andre on 29/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesClientController', EmployeesClientController);

    EmployeesClientController.$inject = ['$scope', '$resource', '$stateParams', 'Employees', '$location', '$mdToast', 'Admin'];

    function EmployeesClientController($scope, $resource, $stateParams, Employees, $location, $mdToast, Users) {
        var Employee = $resource('/api/employees');

        $scope.userData = {
            userList: getUsers()
        };

        function getUsers() {
            return Users.query({restriction:true});
        }


        $scope.addEmployee = function () {
            var newEmployee = Employee.save($scope.newEmployee, function () {
                initNewEmployee();
                $scope.showToastSave();
                console.log("Employee saved");
            });
            updateUser(newEmployee)
        };

        $scope.findEmployee = function () {
            Employees.get(
                {employeeId: $stateParams.employeeId},
                function (employee) {
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
                updateUser(employee);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        function updateUser(employee) {
            return Users.get(
                {userId: employee.user},
                function (user) {
                    user.employee = employee._id;

                    user.$update(function () {
                        $location.path('employees/' + employee._id);
                    });
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
        }

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


        function initNewEmployee() {
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
        }
    }
}());
