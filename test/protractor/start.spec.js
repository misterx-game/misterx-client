'use strict';

describe('Start page', function() {

  beforeEach(function() {
    browser.get('/');
  });

  it('should link the login page', function() {

    var loginButton = element(by.css('[ng-click="ctrl.login()"]'));

    expect(loginButton.getText()).toEqual('Proceed to Login');

  });
});
