'use strict';

describe('Controller: UpdatePreviewCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('irisBenadoArchitectsApp'));

  var UpdatePreviewCtrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdatePreviewCtrlCtrl = $controller('UpdatePreviewCtrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
