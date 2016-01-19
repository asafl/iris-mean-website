'use strict';

describe('Controller: SingleSpaceCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('irisBenadoArchitectsApp'));

  var SingleSpaceCtrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingleSpaceCtrlCtrl = $controller('SingleSpaceCtrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
