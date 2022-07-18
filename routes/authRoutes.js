//IMPORTING PACKAGES
const express = require('express');
const passport = require('passport');
const router = express.Router();

//IMPORTING CONTROLLERS
const auth = require('../controllers/auth');

//ROUTES
router
    .route('/register')
    .get(auth.registerRender)
    .post(auth.registerNewUser);

router
    .route('/login')
    .get(auth.loginRender)
    .post(passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/", 
        failureMessage: true, 
        keepSessionInfo: true
    }),auth.loginUser);

module.exports = router;