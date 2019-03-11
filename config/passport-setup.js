const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');

passport.use(
  new GoogleStrategy({
  // options for the google GoogleStrategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
  }, (accesssToken, refreshToken, profile, done) => {
    // passport callback function

  })
);