const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res, next) => {
  const { validationErr } = userSchema.validate(req.body);
  if (validationErr) {
    const err = new Error(validationErr.details[0].message);
    err.statusCode = 403;
    return next(err);
  }
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return next(err);
    }

    try {
      const result = await global.users.insertOne({ email: req.body.email, password: hash });
      if (!result.insertedId) {
        return next(new Error('Registration failed.'))
      }
    }
    catch (err) {
      if (err.code === 11000) {
        return next(new Error('Username is taken. Please try another.'));
      }
      return next(new Error('Registration Failed'));
    }
    res.sendStatus(201);
  });
})


router.post('/login', async (req, res, next) => {
  const { validationErr } = userSchema.validate(req.body);
  if (validationErr) {
    const err = new Error(validationErr.details[0].message);
    err.statusCode = 403;
    return next(err);
  }
  const existingUser = await global.users.findOne({ email: req.body.email });
  if (existingUser) {
    const correctPswrd = await bcrypt.compare(req.body.password, existingUser.password);
    if (correctPswrd) {
      // const existingSessionID = existingUser.sessionID;
      // if (existingSessionID) {
      //   const session = await req.sessionStore.get(existingSessionID);
      //   if (session) {
      //     req.session = session;
      //   }
      // }
      // existingUser.sessionID = req.sessionID;
      // await global.users.updateOne({ id: exist.id }, { $set: { sessionID: req.sessionID } });
      
      //let name = req.body.email.split('@');
      //req.session.username = name[0];
      req.session.username = req.body.email;
      //return res.sendStatus(200);
      res.status(200).send(existingUser);
    }
  }
  const err = new Error('Invalid username or password!');
  err.statusCode = 401;
  return next(err);
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = router;

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required()
});