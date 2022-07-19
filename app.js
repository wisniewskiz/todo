if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//IMPORTING REQUIRED PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const methodOverride = require("method-override");

const path = require("path");
const engine = require("ejs-mate");

const app = express();

//SETTING UP MONGOOSE AND MONGODB
mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection error")
);
mongoose.connection.once("open", () => {
  console.log("Database connected!");
});

//EXPRESS ENGINES AND PATH LOCATIONS
app.set("view engine", "ejs");
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const sessionConfig = {
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

//MODELS AND ROUTES
const authRoutes = require("./routes/authRoutes");
const secureRoutes = require("./routes/secureRoutes");
const User = require('./models/User');

//MIDDLEWARES
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//SETTING UP PASSPORT  
passport.use(new LocalStrategy({
  usernameField: 'email',
  passportField: 'password'
},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//ROUTES
app.get("/", (req, res) => {
  res.render("home/index");
});

app.use("/", authRoutes);
app.use("/", secureRoutes);

//STARTING SERVER
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
