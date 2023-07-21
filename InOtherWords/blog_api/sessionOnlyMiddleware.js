module.exports = function sessionOnlyMiddleware(req, res, next) {
  const session = JSON.parse(req.session);
  const username = session.username;
  if (username) {
    next();
  } else {
    res.sendStatus(401);
  }
};
