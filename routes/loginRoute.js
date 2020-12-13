var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario');
const Token = require('../models/token');
const loginController = require('../controllers/loginController');


router.get('/', function (req, res) {
    res.render('session/login');
});

router.post('/', loginController.login_post);

router.get('/create', loginController.create_get);

router.post('/create', loginController.create_post);

router.get('/forgotPassword', function (req, res) {
    res.render('session/forgotPassword');
});

router.post('/forgotPassword', loginController.forgotPassword_post);

router.get('/resetPassword/:token', function (req, res) {
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token)
            return res
                .status(400)
                .send({
                    type: 'not-verified',
                    msg:
                        'No existe un usuario asociado al token. Verifique que su token no haya expirado',
                });

        Usuario.findById(token._userId, function (err, usuario) {
            if (!usuario)
                return res
                    .status(400)
                    .send({ msg: 'No existe un usuario asociado al token.' });
            res.render('session/resetPassword', {
                errors: {},
                usuario: usuario,
            });
        });
    });
});

router.post('/resetPassword', function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        res.render('session/resetPassword', {
            errors: {
                confirm_password: {
                    message: 'No coincide con el password ingresado',
                },
            },
            usuario: new Usuario({ email: req.body.email }),
        });
        return;
    }
    Usuario.findOne({ email: req.body.email }, function (err, usuario) {
        usuario.password = req.body.password;
        usuario.save(function (err) {
            if (err) {
                res.render('session/resetPassword', {
                    errors: err.errors,
                    usuario: new Usuario({ email: req.body.email }),
                });
            } else {
                res.redirect('/login');
            }
        });
    });
});

module.exports = router;