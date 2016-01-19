'use strict';

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// Get list of spaces
exports.send = function(req, res) {
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://asaf.lib%40gmail.com:nvnduzznhabmjwyj@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: req.body.name + ' <' + req.body.email + '>', // sender address
		to: 'asaf.lib@gmail.com', // list of receivers
		subject: "[Mail from your website] You've got mail from " + req.body.name + " from mail: " + req.body.email, // Subject line
		text: req.body.message, // plaintext body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){ handleError(res, error); }

		res.status(200).json(info);
	});
};

function handleError(res, err) {
	return res.status(500).send(err);
}