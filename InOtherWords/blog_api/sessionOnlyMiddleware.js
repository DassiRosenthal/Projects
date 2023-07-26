module.exports = function sessionOnlyMiddleware(req, res, next) {
  console.log(req.session.user.username);
   if (req.session.user.username) {
    next();
  } else {
    res.sendStatus(401);
  }
};
