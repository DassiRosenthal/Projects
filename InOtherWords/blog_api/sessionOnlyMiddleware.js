module.exports = function sessionOnlyMiddleware(req, res, next) {
   if (req.session.user.username) {
    next();
  } else {
    res.sendStatus(401);
  }
};
