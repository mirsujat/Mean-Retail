'use strict';

exports = module.exports = function(app, passport) {
  var LocalStrategy = require('passport-local').Strategy,
      FacebookStrategy = require('passport-facebook').Strategy,
      GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
      

  passport.use(new LocalStrategy(
    function(username, password, done) {
      var workflow = new (require('events').EventEmitter)();

      workflow.on('findUser', function(){
        var conditions = {isActive: 'yes'};
        if (username.indexOf('@') === -1) {
          conditions.username = username;
        }
        else {
          conditions.email = username;
        }

        app.db.models.User.findOne(conditions, function (err, user) {
          if(err){
            return workflow.emit('exception', err);
          }
          if(!user){
            return workflow.emit('exception', 'Unknown user');
          }
          workflow.emit('validatePassword', user)
        });
      });

      workflow.on('validatePassword', function(user){
        app.db.models.User.validatePassword(password, user.password, function(err, isValid) {
          if (err) {
            return workflow.emit('exception', err);
          }

          if (!isValid) {
            return workflow.emit('exception', 'Invalid password');
          }

          workflow.emit('populateUser', user);
        });
      });

      workflow.on('populateUser', function(user){
        user.populate('roles.admin roles.account', function(err, user){
          if(err){
            return workflow.emit('exception', err);
          }
          if (user && user.roles && user.roles.admin) {
            user.roles.admin.populate("groups", function(err, admin) {
              if(err){
                return workflow.emit('exception', err);
              }
              return workflow.emit('result', user);
            });
          }
          else {
            return workflow.emit('result', user);
          }
        });
      });

      workflow.on('result', function(user){
        return done(null, user);
      });

      workflow.on('exception', function(x){
        if(typeof x === 'string'){
          return done(null, false, {message: x});
        }else{
          return done(null, false, x);
        }
      });

      workflow.emit('findUser');
    }
  ));

  if (app.config.oauth.facebook.key) {
    passport.use(new FacebookStrategy({
        clientID: app.config.oauth.facebook.key,
        clientSecret: app.config.oauth.facebook.secret,
        callbackURL: app.config.oauth.facebook.callback
      },
      function(accessToken, refreshToken, profile, done) {
        done(null, false, {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile
        });
      }
    ));
  }

  if (app.config.oauth.google.key) {
    passport.use(new GoogleStrategy({
        clientID: app.config.oauth.google.key,
        clientSecret: app.config.oauth.google.secret,
        callbackURL: app.config.oauth.google.callback
      },
      function(accessToken, refreshToken, profile, done) {
        done(null, false, {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile
        });
      }
    ));
  }

  

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    app.db.models.User.findOne({ _id: id }).populate('roles.admin').populate('roles.account').exec(function(err, user) {
      if (user && user.roles && user.roles.admin) {
        user.roles.admin.populate("groups", function(err, admin) {
          done(err, user);
        });
      }
      else {
        done(err, user);
      }
    });
  });
};
