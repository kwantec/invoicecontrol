(function () {
  'use strict';

  // Employees controller
  angular.module('employees').controller('EmployeesController', ['$scope', '$http', 'EmployeesService',
    function ($scope, $http, EmployeesService) {

      $scope.employee = {};
      // $scope.clickedSubmit = function () {
      //   // EmployeesService.createEmployee($scope.employee);
      //   EmployeesService.createEmployee($scope.employee).then(function(response){
      //     console.log("éxito", response);
      //   }).catch(function(err) {
      //     console.log("err", err);
      //   });
      // };

      $scope.submit = function(form){
        EmployeesService.createEmployee($scope.employee).then(function(response){
          console.log("éxito", response);
        }).catch(function(err) {
          console.log("err", err);
        });
      };
    }
  ]);
}());
