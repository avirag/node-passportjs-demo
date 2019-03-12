const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

// view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to  mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongoDB');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home', {
    user: req.user
  });
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});