const passport = require("passport");
require("../config/passport");

module.exports = {
    googleAuth: (req, res, next) => {
        passport.authenticate("google", { scope: ["email", "profile"] })(req, res, next);
    },
    googleAuthCB: (req, res, next) => {
        passport.authenticate("google", function (err, user) {
            if (err) {
                return next(err);
            }
            if (user != null) {
                // Authentication failed, redirect to /login
                return res.redirect("/login");
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                // Authentication successful, redirect to /
                return res.redirect("/");
            });
        })(req, res, next);
    },
    demoAuth: (req, res, next) => {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return next(err);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect("/");
            });
        })(req, res, next);
    },
};
