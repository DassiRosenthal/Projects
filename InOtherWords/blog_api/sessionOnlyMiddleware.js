module.exports = function sessionOnlyMiddleware(req, res, next) {
   if (req.session.user && req.session.user.isLoggedIn) {
    next();
  } else {
    res.sendStatus(401);
  }
};
