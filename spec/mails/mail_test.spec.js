var nodemailer = require('nodemailer')
const Mailer = require('../../mailer/testMail');

describe('Probando mailer', () =>{
    describe('Enviar mail', () =>{
        it('Mensaje correctamente enviado', async (done) =>{
            const info = await Mailer.sendMail({
                from: "'Juanfe Romero' <juanfeRomero@gmail.com>",
                to: "alguien@example.com",
                subject: "hello5",
                text:"hola como estas, este es un mail de prueba a ver si funciona",
                html:"<b>Hello world</b>"
            })
        
            expect(typeof info.messageId).toBe('string')
            expect((nodemailer.getTestMessageUrl(info)).substr(0,16)).toBe("https://ethereal")
            done()
        })
    })
})