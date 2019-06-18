var authController = require('../controllers/authcontroller.js');
const nodemailer = require('nodemailer');
const connection = require('../mysql/connection');

module.exports = function (app, passport) {


    app.get('/signup', authController.signup);


    app.get('/signin', authController.signin);


    app.post('/signup', passport.authenticate('local-signup'), function (req, res) {
        let email = req.user.dataValues.email;
        res.send(req.user)
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'fencervalery@gmail.com',
                pass: '((V1967765v))'
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        let mailOptions = {
            from: 'Val Klimko second<fencervalery@gmail.com>',
            to: ' <' + email + '>',
            subject: 'Registr ✔',
            text: 'Registration',
            html: '<strong>TO REGISTRATION: </strong>'
                + ' <a href="http://localhost:5000/registr?mail='
                + email
                + '">click here</a>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        });

        transporter.close();


    });


    app.get('/dashboard', isLoggedIn, authController.dashboard);


    app.get('/logout', authController.logout, function (req, res) {
        res.send(req.status(200))
    });


    app.post('/signin', passport.authenticate('local-signin'), function (req, res) {
        res.send(req.user)
    });


    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

    app.get('/registr', function (req, res) {
        let response = res;
        connection.query("UPDATE ilia.users SET status = ? WHERE email = ?", ["active", req.query.mail], function (err, res) {

            if (err) {
                console.log("error: ", err);
            } else {
                console.log('ilia : ', res);
                response.redirect('http://localhost:3000');
            }
        })
    })

    app.get('/users', function (req, res) {
        let response = res;
        connection.query("Select * from ilia.users", function (err, res) {

            if (err) {
                console.log("error: ", err);
            } else {
                console.log('ilia : ', res);
                response.send(res);
            }
        })
    })

    app.delete('/users', function (req, res) {
        console.log(req.body.id)
        let response = res;
        connection.query("Delete from ilia.users WHERE id = ?", [req.body.id], function (err, res) {

            if (err) {

            } else {

                response.send(res);
            }
        })
    })

    app.post('/users/update', function (req, res) {
        console.log(req.body.id)
        console.log(req.body.isBlock)
        let id = req.body.id;
        let response = res;
        let updateUser = (field, value) => connection.query("Update ilia.users Set " + field + " = ? WHERE id = ?", [value, id],
            function (err, res) {

                if (err) {

                } else {

                    response.send(res);
                }
            })
        if (req.body.isBlock) {
            updateUser("status", "inactive")
        } else {
            updateUser("adminStatus", "true")
        }
    })


}