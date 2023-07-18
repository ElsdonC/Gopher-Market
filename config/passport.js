require("dotenv").config();
const { use } = require("passport");
const passport = require("passport");
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const LocalStrategy = require("passport-local");

var strategy = new LocalStrategy(async function (username, password, cb) {
    try {
        const user = await User.findOne({ googleId: "demo" });
        return cb(null, user);
    } catch (err) {
        return cb(err);
    }
});
passport.use(strategy);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:3000/auth/google/callback`,
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    if (user.googleId == "demo") {
        process.nextTick(function () {
            return done(null, user);
        });
    } else {
        done(null, user);
    }
});

passport.deserializeUser(async function (user, done) {
    if (user.googleId == "demo") {
        process.nextTick(function () {
            return done(null, user);
        });
    } else if (user.email.includes("@umn.edu")) {
        const existingUser = await User.findOne({ googleId: user.id })
        if (existingUser == null) {
            const newUser = await User.create({
                googleId: user.id,
                email: user.email,
                displayName: user.displayName,
                saved: [],
            });
            return done(null, newUser);
        } else {
            return done(null, existingUser);
        }
    } else {
        return done(null, null);
    }
});
