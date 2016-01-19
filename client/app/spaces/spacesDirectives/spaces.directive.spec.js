'use strict';

describe('Directive: spaces', function () {

  // load the directive's module
  beforeEach(module('irisBenadoArchitectsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<spaces></spaces>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the spaces directive');
  }));
});