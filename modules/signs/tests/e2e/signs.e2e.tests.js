'use strict';

describe('Signs E2E Tests:', function () {
  describe('Test Signs page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/signs');
      expect(element.all(by.repeater('sign in signs')).count()).toEqual(0);
    });
  });
});
