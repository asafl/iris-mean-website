'use strict';

angular.module('irisBenadoArchitectsApp')
  .config(function ($stateProvider) {
    $stateProvider
        .state('update', {
            url: '/update',
            templateUrl: 'app/update/update.html',
            controller: 'UpdateCtrl'
        })
        .state('preview', {
            url: '/update/preview',
            templateUrl: 'app/spaces/spaces.html',
            controller: 'SpacesCtrl'
        })
        .state('single_preview', {
            url: '/update/preview/:id',
            templateUrl: 'app/spaces/spaces.html',
            controller: 'SpacesCtrl'
        });
  });