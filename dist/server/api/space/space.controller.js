'use strict';

var _ = require('lodash');
var Space = require('./space.model');
var fs = require('fs');
var url = require('url');
//var Imagemin = require('imagemin');
//var imagemin = require('image-min');

var path = require('path');
var sharp = require('sharp');
var Q = require('q');

// Get list of spaces
exports.index = function(req, res) {
  Space.find(function (err, spaces) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(spaces);
  });
};

// Get a single space
exports.show = function(req, res) {
  Space.findById(req.params.id, function (err, space) {
    if(err) { return handleError(res, err); }
    if(!space) { return res.status(404).send('Not Found'); }
    return res.json(space);
  });
};

// get all spaces with only a single image per space (random? pre selected?) for the main screen
exports.spacesShowcase = function (req, res) {
  Space.find(function (err, spaces) {
    if(err) { return handleError(res, err); }

    _.forEach(spaces, function (space) {
      var space_images = _.find(space.images, {'main': true});

      if (!space_images) { // if no main image, get first image
        space_images = _.first(space.images);
      }

      space.images = space_images;
    });

    return res.status(200).json(spaces);
  });

};

// Creates a new space in the DB.
exports.create = function(req, res) {
  Space.create(req.body, function(err, space) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(space);
  });
};

// get one image or all images for space
exports.getImage = function(req,res) {
  Space.findById(req.params.id, function (err, space) {
    if (err) {
      return handleError(res, err);
    }

    if (!space) {
      return res.status(404).send('Space Not Found');
    }

    var url_parts = url.parse(req.url, true);
    // check if there's an imId -- if so get the image, else get all
    if (url_parts.query.imId) { // there's an image id - get image

      var im = _.find(space.images, {'id': url_parts.query.imId});
      return res.json(im);
    } else {

      // no particular image id, get all images for space
      return res.json(space.images);
    }
  });
};

exports.addImage = function(req,res) {
  var files = req.files.file;
  //var files = [];
  //files.push(req.files.files);

  var arrayOfImages = [];
  var arrayOfPromises = [];

  files.forEach(function (file) {

    var original_data = fs.readFileSync(file.path);

    // create a promise and push it into array of promises
    var savePromise = Q.defer();
    arrayOfPromises.push(savePromise.promise);

    sharp(original_data)
        .resize(940, 940)
        .max()
        .toFormat('jpeg')
        .compressionLevel(6)
        .trellisQuantisation()
        .toBuffer(function (err, buffer, info) {

          if (err) { return handleError(res, err); }

          // save image in db as base64 encoded - this limits the image size
          // so there should be size checks here and in client
          var base64Image = buffer.toString('base64');

          // after saving file - unlink it
          fs.unlinkSync(file.path);

          var tempIm = {
            img: base64Image,
            info: "",
            credits: "",
            main: false,
            sizeX: 3,
            sizeXMain: 3,
            sizeY: 2,
            sizeYMain: 2,
            col: 0,
            colMain: 0,
            row: 0,
            rowMain: 0
          };

          Space.update({_id: req.params.id}, { $push: { images: tempIm } }, function (err) {
            if (err) { return handleError(res, err); }

            // get image to send back to server
            Space.findById(req.params.id, function (err, space) {
              arrayOfImages.push(space.images[space.images.length-1]);
              savePromise.resolve();
            });

          });

        });

  });

  // if all promises were resolved...
  Q.allSettled(arrayOfPromises).then(function (results) {
    return res.status(200).json(arrayOfImages);
  });

};

// update image text
exports.updateImage = function (req, res) {
  // deleting the id from the body (don't need to update it)
  if(req.body._id) { delete req.body._id; }

  // find space
  Space.findById(req.params.id, function (err, space) {
    if (err) { return handleError(res, err); }
    if(!space) { return res.status(404).send('Not Found'); }

    // find index of image
    var url_parts = url.parse(req.url, true);
    var imIndex = _.findIndex(space.images, {'id': url_parts.query.imId});

    // merge it and set it
    var updated = _.merge(space.images[imIndex], req.body);
    space.images.set(imIndex, updated);

    // save space
    space.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(1);
    });
  });
};

// remove image from space
exports.deleteImage = function(req, res) {
  /*// find space to delete image from
  Space.findById(req.params.id, function (err, space) {
    if (err) {
      return handleError(res, err);
    }

    if (!space) {
      return res.status(404).send('Space Not Found');
    }

    //var im = _.find(space.images, {'id': req.params.id});
    var url_parts = url.parse(req.url, true);

    // remove image from space using the $pull operator
    space.update({ $pull: { images : { 'id' : url_parts.query.imId}}},
        function (err) {
          if (err) {
            return handleError(res, err);
          }
          else {
            return res.status(200).json(1);
          }
        }
    );
  });*/

  var url_parts = url.parse(req.url, true);
  Space.update({_id: req.params.id}, { $pull: { images: { _id: url_parts.query.imId } } },
    function (err) {
      if (err) {
        return handleError(res, err);
      }
      else {
        return res.status(200).json(1);
      }
    }
  );
};

exports.deleteAllImages = function (req, res) {
  // find space to delete image from
  Space.findById(req.params.id, function (err, space) {
    if (err) {
      return handleError(res, err);
    }

    if (!space) {
      return res.status(404).send('Space Not Found');
    }

    // remove all images from space
    space.update({ $set: { images : []}},
        function (err) {
          if (err) {
            return handleError(res, err);
          }
          else {
            space.images = []; // update here so that it would be sent empty (the DB is OK even without it for some reason.
            return res.status(200).json(space);
          }
        }
    );

  });
}

// Updates an existing space in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Space.findById(req.params.id, function (err, space) {
    if (err) { return handleError(res, err); }
    if(!space) { return res.status(404).send('Not Found'); }
    var updated = _.merge(space, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(space);
    });
  });
};

// Deletes a space from the DB.
exports.destroy = function(req, res) {
  Space.findById(req.params.id, function (err, space) {
    if(err) { return handleError(res, err); }
    if(!space) { return res.status(404).send('Not Found'); }
    space.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

//new Imagemin()
//  .src(file.path)
//  .dest('/')
//  .use(Imagemin.jpegtran({progressive: true}))
//  .run(function (err, files) {
//    console.log('error', err);
//    console.log('files', files);
//    // => {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
//  });

//var src = fs.createReadStream(file.path);
//var ext = path.extname(src.path);
//
//src
//    .pipe(imagemin({ ext: ext }))
//    .pipe(fs.createWriteStream(path.dirname(src.path) + '/img-minified' + ext));


