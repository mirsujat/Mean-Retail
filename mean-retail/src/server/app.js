'use strict';

//dependencies
var config = require('./modules/core/config'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    http = require('http'),
    path = require('path'),
    favicon = require('serve-favicon'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    helmet = require('helmet'),
    csrf = require('csurf');

//create express app
var app = express();

//keep reference to config
app.config = config;

/**
//Setup Environment 
switch (app.config.Env) {
    case 'build':
        console.log('** BUILD **');
        app.use(require('serve-static')(path.join(__dirname, '../../build/')));
        app.use('*', require('serve-static')(path.join(__dirname, '../../build/index.html')));
        break;
    case 'dev': 
        console.log('** DEV **');
        app.use(require('serve-static')(path.join(__dirname, '../../src/client/')));
        app.use(require('serve-static')(path.join(__dirname, '../../')));
        app.use(require('serve-static')(path.join(__dirname, '../../temp')));
        app.use('*', require('serve-static')(path.join(__dirname, '../../src/client/index.html')));
        break;
        
    default:
        console.log('** DEV **');
        app.use(require('serve-static')(path.join(__dirname, '../../src/client/')));
        app.use(require('serve-static')(path.join(__dirname, '../../')));
        app.use(require('serve-static')(path.join(__dirname, '../../temp')));
        app.use('*', require('serve-static')(path.join(__dirname, '../../src/client/index.html')));
        break;
}
*/

//setup the web server
app.server = http.createServer(app);

//setup mongoose

app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  //and... we have a data store
});

//config data models
require('./modules/user/models')(app, mongoose);

//settings
app.disable('x-powered-by');
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware
app.use(require('morgan')('dev'));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(require('compression')());
app.use(require('serve-static')(path.join(__dirname, '../../build')));
app.use(require('method-override')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cryptoKey));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.cryptoKey,
  store: new mongoStore({ url: config.mongodb.uri })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf({ cookie: { signed: true } }));
helmet(app);

//response locals
app.use(function(req, res, next) {
  res.cookie('_csrfToken', req.csrfToken());
  res.locals.user = {};
  res.locals.user.defaultReturnUrl = req.user && req.user.defaultReturnUrl();
  res.locals.user.username = req.user && req.user.username;
  next();
});

//global locals
app.locals.projectName = app.config.projectName;
app.locals.copyrightYear = new Date().getFullYear();
app.locals.copyrightName = app.config.companyName;
app.locals.cacheBreaker = 'br34k-01';

//setup passport
require('./modules/user/passport')(app, passport);

//setup routes
require('./modules/user/routes')(app, passport);

//custom (friendly) error handler
app.use(require('./modules/user/service/http').http500);

//setup utilities
app.utility = {};
app.utility.sendmail = require('./modules/user/util/sendmail');
app.utility.slugify = require('./modules/user/util/slugify');
app.utility.workflow = require('./modules/user/util/workflow');

//listen up
app.server.listen(app.config.port, function(){
  console.log('Server listening on port::====> ' + app.config.port);

});
