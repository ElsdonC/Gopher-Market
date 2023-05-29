module.exports = {
    ensureAuth: (req,res,next) => {
        if (req.user) {
            return next()
        } else {
            res.redirect('/login')
        }
    },
    ensureNotDemo: (req,res,next) => {
        if (req.user.googleId != "demo") {
            return next()
        } else {
            res.redirect('/login')
        }
    }
}