module.exports.dashboardRender = (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'you mush be signed in');
        res.redirect('/');
    };
    res.render('dashboard/dashboard', { user : req.user });
};