const Usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: function (req, res, next) {
        Usuario.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (userInfo === null) {
                    return res.status(401).json({
                        status: 'error',
                        message: 'Mail/Password incorreto',
                        data: null,
                    });
                } else if (
                    userInfo != null &&
                    bcrypt.compareSync(req.body.password, userInfo.password)
                ) {
                    const token = jwt.sign(
                        { id: userInfo._id },
                        req.app.get('secretKey'),
                        { expiresIn: '7d' }
                    );
                    res.status(200).json({
                        message: 'usuario encontrado!',
                        data: { usuario: userInfo, token: token },
                    });
                } else {
                    res.status(401).json({
                        status: 'error',
                        message: 'Mail/Password Invalidos!',
                    });
                }
            }
        });
    },
    fogotPassword: function (req, res, next) {
        Usuario.findOne({ email: req.body.email }, function (err, usuario) {
            if (!usuario)
                return res
                    .status(401)
                    .json({ message: 'No existe el usuario', data: null });
            usuario.resetPassword(function (err) {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    message: 'Se envio un email para resstablecer el password',
                    data: null,
                });
            });
        });
    },
    authFacebookToken: function (req, res, next) {
        if (req.user) {
            req.user
                .save()
                .then(() => {
                    const token = jwt.sign(
                        { id: req.user.id },
                        req.app.get('secretKey'),
                        { expiresIn: '7d' }
                    );
                    res.status(200).json({
                        message: 'Usuario encontrado o creado!',
                        data: { user: req.user, token: token },
                    });
                })
                .catch((err) => {
                    console.log(
                        'error durante la autorizacion del token: ' + err
                    );
                    res.status(500).json({ message: err.message });
                });
        } else {
            res.status(401);
        }
    },
};
