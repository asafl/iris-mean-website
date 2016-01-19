'use strict';

var express = require('express');
var controller = require('./mail.controller');

var router = express.Router();

router.post('/', controller.send);

module.exports = router;/**
 * Created by asafliberman on 15/01/2016.
 */
