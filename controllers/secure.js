const User = require("../models/User");
const mongoose = require("mongoose");
const Project = require("../models/Project");

module.exports.dashboardRender = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/");
  }
  try {
    const currentUser = await User.findById(req.user._id).populate("projects");
    currentUser.save();
    console.log(currentUser);
    res.render("dashboard/dashboard", { currentUser });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.newProjectRender = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/login");
  }
  const user = req.user;
  res.render("dashboard/newProject", { user });
};

module.exports.newProjectPush = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/login");
  }
  try {
    const project = new Project({...req.body.project, owner: req.user._id});
    const updateProject = await User.findById(req.user._id);
    updateProject.projects.push(mongoose.Types.ObjectId(project._id));
    updateProject.save();
    res.redirect("/dashboard");
  } catch (e) {
    console.log(e.message);
  }
};
