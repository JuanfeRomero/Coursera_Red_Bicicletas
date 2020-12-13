var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let passmail = req.user? req.user.email: 'no email'
  let passId = req.user? req.user._id: 'no email'
    res.render('index', { title: 'Red De Bicis', logged: {email: passmail, id: passId, isLogged: Boolean(req.user)} });
});

module.exports = router;