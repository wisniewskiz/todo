const User = require("../models/User");
const mongoose = require('mongoose');

module.exports.dashboardRender = async (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'you mush be signed in');
        res.redirect('/');
    };
    const userId = req.user._id;
    const user = req.user;
    const userData = await User.findById(userId);
    const projects = userData.projects
    res.render('dashboard/dashboard', { projects, user });
};

module.exports.newProjectRender = (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'you mush be signed in');
        res.redirect('/login');
    }
    res.render('dashboard/newProject', { user: req.user });
};

module.exports.newProjectPush = async (req, res) => {
    try{
        const currentUser = await User.findById(req.user._id)
        const newProject = req.body.project;
        currentUser.projects.push(newProject);
        const updated = await currentUser.save();
    } catch(e) {
        console.log(e);
    }
    res.redirect('/dashboard');
}