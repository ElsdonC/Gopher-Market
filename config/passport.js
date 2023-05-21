require('dotenv').config()
const { use } = require('passport');
const passport = require('passport')
const User = require('../models/user');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://gophermarket.onrender.com/auth/google/callback",
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
));

passport.serializeUser(function(user, done) {
  done(null, user); 
});

passport.deserializeUser(function(user, done) {
  if (!user.email.includes('@umn.edu')) {
    return done(null, null)
  }
  User.findOne({ googleId: user.id })
    .then(existingUser => {
      if (!existingUser) {
        const newUser = User.create({googleId: user.id, email: user.email, displayName: user.displayName, image: user.picture})
        return done(null, newUser)
      }
      return done(null, existingUser);
    })
    .catch(err => {
      return done(err, null);
    });
});