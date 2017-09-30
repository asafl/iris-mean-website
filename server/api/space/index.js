'use strict';

var express = require('express');
var controller = require('./space.controller');

var router = express.Router();

// load connect multiparty to extract and save files if there are any
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

router.get('/', controller.index); // gets all spaces with all images (crazy)
router.get('/1pic', controller.spacesShowcase);
router.get('/:id', controller.show); // get a space with all images
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

// deal with images directly
router.get('/:id/imageIDs', controller.getAllSpaceImagesIdsWithDetails);
router.get('/:id/im', controller.getImage);
router.post('/:id/im', multipartyMiddleware, controller.addImage);
router.put('/:id/im', controller.updateImage);
router.patch('/:id/im', controller.updateImage);
router.delete('/:id/im', controller.deleteImage);
router.delete('/:id/im/allIm', controller.deleteAllImages);

module.exports = router;