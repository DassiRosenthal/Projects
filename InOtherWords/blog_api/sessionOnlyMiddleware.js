module.exports = function sessionOnlyMiddleware(req, res, next) {
   if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
