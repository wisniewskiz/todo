const passport = require("passport");
const User = require("../models/User");

module.exports.registerRender = (req, res) => {
  res.render("auth/register");
};

module.exports.registerNewUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    const newUser = await User.register(user, req.body.password);
    req.login(newUser, err => {
        if(err) return next(err);
        req.flash('success', 'welcome to the dash');
        res.redirect('/dashboard')
    });
  } catch (e) {
    console.log(e.message);
    res.redirect("/register");
  }
};

module.exports.loginRender = (req, res) => {
  res.render("auth/login");
};

module.exports.loginUser = (req, res) => {
    try {
        req.flash("success", "Welcome back");
        res.redirect("/dashboard/");
    } catch(e) {
        console.log(e);
    }
  };
