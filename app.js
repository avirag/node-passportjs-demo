const express = require('express');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');

const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

// view engine
app.set('view engine', 'ejs');

// connect to  mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongoDB');
});

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});