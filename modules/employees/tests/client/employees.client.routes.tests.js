(function () {
  'use strict';

  describe('Employees Route Tests', function () {
    // Initialize global variables
    var $scope,
      EmployeesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _EmployeesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      EmployeesService = _EmployeesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('employees');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/employees');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          EmployeesController,
          mockEmployee;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('employees.view');
          $templateCache.put('modules/employees/client/views/view-employee.client.view.html', '');

          // create mock Employee
          mockEmployee = new EmployeesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Employee Name'
          });

          // Initialize Controller
          EmployeesController = $controller('EmployeesController as vm', {
            $scope: $scope,
            employeeResolve: mockEmployee
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:employeeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.employeeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            employeeId: 1
          })).toEqual('/employees/1');
        }));

        it('should attach an Employee to the controller scope', function () {
          expect($scope.vm.employee._id).toBe(mockEmployee._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/employees/client/views/view-employee.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          EmployeesController,
          mockEmployee;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('employees.create');
          $templateCache.put('modules/employees/client/views/form-employee.client.view.html', '');

          // create mock Employee
          mockEmployee = new EmployeesService();

          // Initialize Controller
          EmployeesController = $controller('EmployeesController as vm', {
            $scope: $scope,
            employeeResolve: mockEmployee
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.employeeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/employees/create');
        }));

        it('should attach an Employee to the controller scope', function () {
          expect($scope.vm.employee._id).toBe(mockEmployee._id);
          expect($scope.vm.employee._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/employees/client/views/form-employee.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          EmployeesController,
          mockEmployee;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('employees.edit');
          $templateCache.put('modules/employees/client/views/form-employee.client.view.html', '');

          // create mock Employee
          mockEmployee = new EmployeesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Employee Name'
          });

          // Initialize Controller
          EmployeesController = $controller('EmployeesController as vm', {
            $scope: $scope,
            employeeResolve: mockEmployee
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:employeeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.employeeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            employeeId: 1
          })).toEqual('/employees/1/edit');
        }));

        it('should attach an Employee to the controller scope', function () {
          expect($scope.vm.employee._id).toBe(mockEmployee._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/employees/client/views/form-employee.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
