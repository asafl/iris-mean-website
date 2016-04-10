'use strict';

angular.module('irisBenadoArchitectsApp')
	.controller('UpdateCtrl', function ($scope, spacesService, Modal, $q) {

		$scope.uploading = false;

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
			console.log(files);
			if (files && files.length) {
				//spacesService.uploadImages(space._id, files).then(function (res) {
				//	res.data.forEach(function (image) {
				//		space.images.push(image);
				//	});
				//});

				var array_of_promises = [];
				$scope.uploading = true;

				// uploading file by file
				files.forEach(function (file) {
					// Preparing an array with the file - for the way it's handled in the server. FIX IN THE SERVER IF YOU WANT TO REMOVE THIS UGLY CODE
					var file_ar = [];
					file_ar.push(file);
					// creating promise
					var upload_promise = $q.defer();
					array_of_promises.push(upload_promise.promise);

					spacesService.uploadImages(space._id, file_ar).then(function (res) {
						res.data.forEach(function (image) {
							space.images.push(image);
							upload_promise.resolve();
						});
					});
				});

				$q.all(array_of_promises).then(function () {
					// change back from loading to regular
					$scope.uploading = false;
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
			// reload spaces 1 pic to reload main image!
			spacesService.actuallyLoadsSpaces1Pic();
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
