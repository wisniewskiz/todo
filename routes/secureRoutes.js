//IMPORTING PACKAGES
const express = require('express');
const router = express.Router();

//IMPORTING CONTROLLERS
const secure = require('../controllers/secure');

//ROUTES
router
    .route('/dashboard')
    .get(secure.dashboardRender);

module.exports = router;