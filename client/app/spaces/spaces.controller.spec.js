'use strict';

describe('Controller: SpacesCtrl', function () {

  // load the controller's module
  beforeEach(module('irisBenadoArchitectsApp'));

  var SpacesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpacesCtrl = $controller('SpacesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
