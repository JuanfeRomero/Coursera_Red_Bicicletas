var nodemailer = require('nodemailer');
/*
Name 	Erich Abshire
Username 	erich3@ethereal.email (also works as a real inbound email address)
Password 	U99gbHxeMTG5Kp8crs
*/


const Transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'erich3@ethereal.email',
        pass: 'U99gbHxeMTG5Kp8crs',
    },
});

module.exports = Transporter;