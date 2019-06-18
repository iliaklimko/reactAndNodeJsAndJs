var exports = module.exports = {}

exports.logout = function (req, res) {

    req.session.destroy(function (err) {

        res.redirect('/');

    });

}


exports.signup = function (req, res) {


    res.send('Registration')

}

exports.signin = function (req, res) {

    res.render('signin');

}


exports.dashboard = function (req, res) {

    res.render('dashboard');

}