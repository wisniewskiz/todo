//IMPORTING PACKAGES
const express = require('express');
const router = express.Router();


//IMPORTING CONTROLLERS
const secure = require('../controllers/secure');

//ROUTES
router
    .route('/dashboard')
    .get(secure.dashboardRender);

router
    .route('/dashboard/new-project')
    .get(secure.newProjectRender)
    .post(secure.newProjectPush);

router
    .route('/dashboard/:id')
    .get(secure.projectRender)
    .post(secure.newTaskPush)
    .put(secure.editProjectPush)
    .delete(secure.destoryProject);

router  
    .route('/dashboard/:id/edit')
    .get(secure.editProjectRender);

router 
    .route('/dashboard/:projectid/:taskid')
    .delete(secure.destroyTask);

module.exports = router;