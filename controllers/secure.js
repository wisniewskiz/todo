const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

module.exports.dashboardRender = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/");
  }
  try {
    const currentUser = await User.findById(req.user._id).populate('projects');
    currentUser.save();
    res.render("dashboard/dashboard", { currentUser });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.projectRender = async (req, res) => {
    if (!req.isAuthenticated() ) {
        req.flash("error", "you mush be signed in");
        res.redirect("/");
    }
    const project = await Project.findById(req.params.id).populate('tasks');
    project.save();
    res.render('dashboard/projectDetails', { project });
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
    const project = await new Project({...req.body.project, owner: req.user._id});
    project.save();
    const updateProject = await User.findById(req.user._id);
    updateProject.projects.push(mongoose.Types.ObjectId(project._id));
    updateProject.save();
    res.redirect("/dashboard");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.newTaskPush = async (req, res) => {
    try {
        const task = await new Task({...req.body.task, owner: req.user._id, project: req.params.id});
    const updateProject = await Project.findById(req.params.id);
    updateProject.tasks.push(mongoose.Types.ObjectId(task._id));
    task.save();
    updateProject.save();
    res.redirect(`/dashboard/${req.params.id}`);
    } catch(e) {
        console.log(e.message);
    }
}
