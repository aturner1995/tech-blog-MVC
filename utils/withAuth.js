const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.status(403).json({message: 'Please login to post blogs and comments'});
        return;
    }
    else {
        next();
    }
};

module.exports = withAuth;