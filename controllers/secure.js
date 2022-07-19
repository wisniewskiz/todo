const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

module.exports.dashboardRender = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/");
    return;
  }
  try {
    const currentUser = await User.findById(req.user._id).populate("projects");
    currentUser.save();
    res.render("dashboard/dashboard", { currentUser });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.projectRender = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/");
    return;
  }
  const project = await Project.findById(req.params.id).populate("tasks");
  project.save();
  res.render("dashboard/projectDetails", { project });
};

module.exports.newProjectRender = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/login");
    return;
  }
  const user = req.user;
  res.render("dashboard/newProject", { user });
};

module.exports.editProjectRender = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/login");
    return;
  }
  try {
    const user = await User.findById(req.user._id);
    const project = await Project.findById(req.params.id);
    res.render("dashboard/editProject", { user, project });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.newProjectPush = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/login");
    return;
  }
  try {
    const project = await new Project({
      ...req.body.project,
      owner: req.user._id,
    });
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
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/login");
    return;
  }
  try {
    const task = await new Task({
      ...req.body.task,
      owner: req.user._id,
      project: req.params.id,
    });
    const updateProject = await Project.findById(req.params.id);
    updateProject.tasks.push(mongoose.Types.ObjectId(task._id));
    task.save();
    updateProject.save();
    res.redirect(`/dashboard/${req.params.id}`);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.editProjectPush = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you mush be signed in");
    res.redirect("/login");
    return;
  }
  try {
    const project = await Project.findByIdAndUpdate(req.params.id,{
        ...req.body.project,
        owner: req.user._id
    });
    res.redirect(`/dashboard/${project._id}`);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.destoryProject = async (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "you mush be signed in");
        res.redirect("/login");
        return;
    }
    try {
        await Project.findByIdAndDelete(req.params.id);
        req.flash("success", "Project Deleted");
        res.redirect('/dashboard');
    } catch (e) {
        console.log(e.message);
    }
}
