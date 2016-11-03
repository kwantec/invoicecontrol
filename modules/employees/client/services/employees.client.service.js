(function () {
  'use strict';

  var url = 'http://localhost:3000/api/employees/';
  
  angular.module('employees').factory('EmployeesService', ['$http', EmployeesService]);

  function EmployeesService($http){
    return {
      createEmployee: createEmployee,
      findEmployee: findEmployee,
      listEmployees: listEmployees,
      deleteEmployee : deleteEmployee,
      editEmployee: editEmployee
    };

    function createEmployee(employee) {
      return $http({ method: 'POST', data: employee, url: url });
    }

    function findEmployee(id) {
      return $http({ method: 'GET', url: url + id });
    }

    function listEmployees(){
      return $http({method:'GET',url: url});
    }

    function deleteEmployee(id){
      return $http({method:'DELETE',url: url + id });
    }

    function editEmployee(employee, id){
      return $http({method: 'PUT', data: employee, url: url + id} );
    }
  }

})();
