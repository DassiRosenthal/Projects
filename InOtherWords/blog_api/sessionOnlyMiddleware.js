module.exports = function sessionOnlyMiddleware(req, res, next) {
  let sessionInfo = req.session.split('username:');
  let username = sessionInfo[1];
  if (username) {
    next();
  } else {
    res.sendStatus(401);
  }
};
