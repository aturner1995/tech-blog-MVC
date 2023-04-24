const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.status(403).json({});
        return;
    }
    else {
        next();
    }
};

module.exports = withAuth;