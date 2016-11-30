'use strict';

describe('Timesheets E2E Tests:', function () {
  describe('Test Timesheets page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/timesheets');
      expect(element.all(by.repeater('timesheet in timesheets')).count()).toEqual(0);
    });
  });
});
