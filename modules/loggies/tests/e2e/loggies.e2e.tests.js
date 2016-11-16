'use strict';

describe('Loggies E2E Tests:', function () {
  describe('Test Loggies page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/loggies');
      expect(element.all(by.repeater('loggy in loggies')).count()).toEqual(0);
    });
  });
});
