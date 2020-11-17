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


async function main() {

    const info = await Transporter.sendMail({
        from: "'Juanfe Romero' <juanfeRomero@gmail.com>",
        to: "alguien@example.com",
        subject: "hello5",
        text:"hola como estas, este es un mail de prueba a ver si funciona",
        html:"<b>Hello world</b>"
    })


    console.log("Message sent: "+ info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main()

module.exports = Transporter;