'use strict';

describe('Service: spacesService', function () {

  // load the service's module
  beforeEach(module('irisBenadoArchitectsApp'));

  // instantiate service
  var spacesService;
  beforeEach(inject(function (_spacesService_) {
    spacesService = _spacesService_;
  }));

  it('should do something', function () {
    expect(!!spacesService).toBe(true);
  });

});
