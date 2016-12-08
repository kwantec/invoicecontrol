(function () {
  'use strict';

  describe('Invoices Route Tests', function () {
    // Initialize global variables
    var $scope,
      InvoicesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _InvoicesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      InvoicesService = _InvoicesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('invoices');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/invoices');
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
          InvoicesController,
          mockInvoice;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('invoices.view');
          $templateCache.put('modules/invoices/client/views/view-invoice.client.view.html', '');

          // create mock Invoice
          mockInvoice = new InvoicesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Invoice Name'
          });

          // Initialize Controller
          InvoicesController = $controller('InvoicesController as vm', {
            $scope: $scope,
            invoiceResolve: mockInvoice
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:invoiceId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.invoiceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            invoiceId: 1
          })).toEqual('/invoices/1');
        }));

        it('should attach an Invoice to the controller scope', function () {
          expect($scope.vm.invoice._id).toBe(mockInvoice._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/invoices/client/views/view-invoice.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          InvoicesController,
          mockInvoice;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('invoices.create');
          $templateCache.put('modules/invoices/client/views/form-invoice.client.view.html', '');

          // create mock Invoice
          mockInvoice = new InvoicesService();

          // Initialize Controller
          InvoicesController = $controller('InvoicesController as vm', {
            $scope: $scope,
            invoiceResolve: mockInvoice
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.invoiceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/invoices/create');
        }));

        it('should attach an Invoice to the controller scope', function () {
          expect($scope.vm.invoice._id).toBe(mockInvoice._id);
          expect($scope.vm.invoice._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/invoices/client/views/form-invoice.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          InvoicesController,
          mockInvoice;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('invoices.edit');
          $templateCache.put('modules/invoices/client/views/form-invoice.client.view.html', '');

          // create mock Invoice
          mockInvoice = new InvoicesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Invoice Name'
          });

          // Initialize Controller
          InvoicesController = $controller('InvoicesController as vm', {
            $scope: $scope,
            invoiceResolve: mockInvoice
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:invoiceId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.invoiceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            invoiceId: 1
          })).toEqual('/invoices/1/edit');
        }));

        it('should attach an Invoice to the controller scope', function () {
          expect($scope.vm.invoice._id).toBe(mockInvoice._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/invoices/client/views/form-invoice.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
