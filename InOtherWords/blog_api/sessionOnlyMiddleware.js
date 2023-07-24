module.exports = function sessionOnlyMiddleware(req, res, next) {
   if (req.session) {
    next();
  } else {
    res.sendStatus(401);
  }
};
