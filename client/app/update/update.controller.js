'use strict';

angular.module('irisBenadoArchitectsApp')
	.controller('UpdateCtrl', function ($scope, spacesService, Modal) {

		spacesService.loadAllSpacesWithImages().then(function (res) {
			$scope.spaces = res;
		});

		$scope.createNewSpace = function () {
			spacesService.createSpace().then(function (res) {
				$scope.spaces.push(res.data);
			});
		};

		$scope.updateSpaceDetails = function (space) {
			spacesService.updateSpace(space);
		};

		$scope.deleteSpace = function (space, i) {
			// Are you sure?!
			Modal.confirm.delete(function () {
				spacesService.deleteSpace(space._id).then(function () {
					$scope.spaces.splice(i, 1);
				});
			})('this space');
		};

		$scope.uploadFiles = function (files, space) {
			if (files && files.length) {
				spacesService.uploadImages(space._id, files).then(function (res) {
					res.data.forEach(function (image) {
						space.images.push(image);
					});
				});
			}
		};

		$scope.updateImageDetails = function (space, image) {
			spacesService.updateImageDetails(space._id, image);
		};

		$scope.mainCheckboxChanged = function (space, editedImage) {
			// if it was turned on, turn off main old main
			if (editedImage.main) {
				// find the other main
				var oldMain = _.find(space.images, function (im) {
					if (im._id !== editedImage._id && im.main) {
						return true;
					}
				});

				// if found
				if (oldMain) {
					oldMain.main = false;
					// update it
					spacesService.updateImageDetails(space._id, oldMain);
				}
			}

			// if it was turned off, do nothing (and anyway update)
			spacesService.updateImageDetails(space._id, editedImage);
		};

		$scope.beforeCheckboxChanged = function (space, editedImage) {
			// before changed - update image
			spacesService.updateImageDetails(space._id, editedImage);
		};

		$scope.deleteImage = function (space, image, index) {
			spacesService.deleteImage(space._id, image).then(function () {
				space.images.splice(index, 1);
			});
		};

	});
