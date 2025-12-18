const requireUser = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "user") {
    return res.redirect("/admin/dashboard");
  }

  next();
};

module.exports = requireUser;
