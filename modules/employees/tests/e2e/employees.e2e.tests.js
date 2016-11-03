'use strict';

describe('Employees E2E Tests:', function () {
  describe('Test Employees page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/employees');
      expect(element.all(by.repeater('employee in employees')).count()).toEqual(0);
    });
  });
});
