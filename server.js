var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var cors = require('cors')



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


app.get('/', function (req, res) {

    res.send('Welcome to Passport with Sequelize');

});


var models = require("./app/models");


var authRoute = require('./app/routes/auth')(app, passport);


require('./config/passport/passport')(passport, models.user);


models.sequelize.sync().then(function () {

    console.log('Nice! Database looks fine')


}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});


app.listen(5000, function (err) {

    if (!err)

        console.log("Site is live");

    else console.log(err)

});