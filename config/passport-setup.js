const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
  new GoogleStrategy({
  // options for the google GoogleStrategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
  }, (accesssToken, refreshToken, profile, done) => {
    // passport callback function
    User.findOne({googleId: profile.id}).then(currentUser => {
      if(currentUser) {
        console.log('current user: ', currentUser);
        done(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then(newUser => {
          console.log('new user created', newUser);
          done(null, newUser);
        });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
