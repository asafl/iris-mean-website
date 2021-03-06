'use strict';

describe('Directive: previewDirectives', function () {

  // load the directive's module
  beforeEach(module('irisBenadoArchitectsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<preview-directives></preview-directives>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the previewDirectives directive');
  }));
});