'use strict';

angular.module('irisBenadoArchitectsApp')
	.controller('ContactCtrl', function ($scope, $http) {

		$scope.response = 0; // don't show any message

		$scope.mail = {
			name: '',
			email: '',
			message: ''
		};

		$scope.sendMail = function () {
			if ($scope.mail.name != '' && $scope.mail.email != '' && $scope.mail.message != '') {
				$http.post('/api/mail', {name: $scope.mail.name, email: $scope.mail.email, message: $scope.mail.message}).then(function () {
					console.log(1);
					// success!
					$scope.response = 1;
				}, function () {
					// failure
					$scope.response = 2;
				});
			}
		};

	});
