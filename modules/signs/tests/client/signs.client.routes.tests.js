(function () {
  'use strict';

  describe('Signs Route Tests', function () {
    // Initialize global variables
    var $scope,
      SignsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SignsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SignsService = _SignsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('signs');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/signs');
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
          SignsController,
          mockSign;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('signs.view');
          $templateCache.put('modules/signs/client/views/view-sign.client.view.html', '');

          // create mock Sign
          mockSign = new SignsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Sign Name'
          });

          // Initialize Controller
          SignsController = $controller('SignsController as vm', {
            $scope: $scope,
            signResolve: mockSign
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:signId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.signResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            signId: 1
          })).toEqual('/signs/1');
        }));

        it('should attach an Sign to the controller scope', function () {
          expect($scope.vm.sign._id).toBe(mockSign._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/signs/client/views/view-sign.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SignsController,
          mockSign;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('signs.create');
          $templateCache.put('modules/signs/client/views/form-sign.client.view.html', '');

          // create mock Sign
          mockSign = new SignsService();

          // Initialize Controller
          SignsController = $controller('SignsController as vm', {
            $scope: $scope,
            signResolve: mockSign
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.signResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/signs/create');
        }));

        it('should attach an Sign to the controller scope', function () {
          expect($scope.vm.sign._id).toBe(mockSign._id);
          expect($scope.vm.sign._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/signs/client/views/form-sign.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SignsController,
          mockSign;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('signs.edit');
          $templateCache.put('modules/signs/client/views/form-sign.client.view.html', '');

          // create mock Sign
          mockSign = new SignsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Sign Name'
          });

          // Initialize Controller
          SignsController = $controller('SignsController as vm', {
            $scope: $scope,
            signResolve: mockSign
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:signId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.signResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            signId: 1
          })).toEqual('/signs/1/edit');
        }));

        it('should attach an Sign to the controller scope', function () {
          expect($scope.vm.sign._id).toBe(mockSign._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/signs/client/views/form-sign.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
