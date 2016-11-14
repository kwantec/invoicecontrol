'use strict';

describe('Invoices E2E Tests:', function () {
  describe('Test Invoices page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/invoices');
      expect(element.all(by.repeater('invoice in invoices')).count()).toEqual(0);
    });
  });
});
