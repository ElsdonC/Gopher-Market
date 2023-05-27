const passport = require("passport");
require("../config/passport");

module.exports = {
    googleAuth: (req, res, next) => {
        passport.authenticate("google", { scope: ["email", "profile"] })(req, res, next);
    },
    googleAuthCB: (req, res, next) => {
        passport.authenticate("google", {
            successRedirect: "/",
            failureRedirect: "/login",
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
