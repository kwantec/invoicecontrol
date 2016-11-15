(function () {
  'use strict';

  describe('Loggies Route Tests', function () {
    // Initialize global variables
    var $scope,
      LoggiesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _LoggiesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      LoggiesService = _LoggiesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('loggies');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/loggies');
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
          LoggiesController,
          mockLoggy;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('loggies.view');
          $templateCache.put('modules/loggies/client/views/view-loggy.client.view.html', '');

          // create mock Loggy
          mockLoggy = new LoggiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Loggy Name'
          });

          // Initialize Controller
          LoggiesController = $controller('LoggiesController as vm', {
            $scope: $scope,
            loggyResolve: mockLoggy
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:loggyId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.loggyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            loggyId: 1
          })).toEqual('/loggies/1');
        }));

        it('should attach an Loggy to the controller scope', function () {
          expect($scope.vm.loggy._id).toBe(mockLoggy._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/loggies/client/views/view-loggy.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          LoggiesController,
          mockLoggy;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('loggies.create');
          $templateCache.put('modules/loggies/client/views/form-loggy.client.view.html', '');

          // create mock Loggy
          mockLoggy = new LoggiesService();

          // Initialize Controller
          LoggiesController = $controller('LoggiesController as vm', {
            $scope: $scope,
            loggyResolve: mockLoggy
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.loggyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/loggies/create');
        }));

        it('should attach an Loggy to the controller scope', function () {
          expect($scope.vm.loggy._id).toBe(mockLoggy._id);
          expect($scope.vm.loggy._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/loggies/client/views/form-loggy.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          LoggiesController,
          mockLoggy;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('loggies.edit');
          $templateCache.put('modules/loggies/client/views/form-loggy.client.view.html', '');

          // create mock Loggy
          mockLoggy = new LoggiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Loggy Name'
          });

          // Initialize Controller
          LoggiesController = $controller('LoggiesController as vm', {
            $scope: $scope,
            loggyResolve: mockLoggy
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:loggyId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.loggyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            loggyId: 1
          })).toEqual('/loggies/1/edit');
        }));

        it('should attach an Loggy to the controller scope', function () {
          expect($scope.vm.loggy._id).toBe(mockLoggy._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/loggies/client/views/form-loggy.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
