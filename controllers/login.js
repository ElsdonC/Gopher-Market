module.exports = {
    getLogin: (req,res,next) => {
        res.render('login.ejs', {user:req.user, title: "Login"})
    }
}