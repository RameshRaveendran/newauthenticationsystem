

const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.render('auth/login', { mode: "signin" });
    }
    next();
};

module.exports = requireAuth;
