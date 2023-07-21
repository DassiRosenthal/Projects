module.exports = function sessionOnlyMiddleware(req, res, next) {
  console.log(req.session.username);
  const session = JSON.parse(req.session);
  console.log(session);
  const username = session.username;
  if (username) {
    next();
  } else {
    res.sendStatus(401);
  }
};
