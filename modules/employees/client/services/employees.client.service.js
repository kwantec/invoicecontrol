(function () {
  'use strict';

  angular.module('employees').factory('EmployeesService', ['$http', EmployeesService]);

  function EmployeesService($http){
    return {
      createEmployee: createEmployee
    };

    function createEmployee(employee) {
      return $http({ method: 'POST', data: employee, url: 'http://localhost:3000/api/employees' });
    }
  }

})();
