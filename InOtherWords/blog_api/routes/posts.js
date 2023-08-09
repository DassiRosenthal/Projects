const express = require('express');
const router = express.Router();
const Joi = require('joi');
const sessionOnlyMiddleware = require('../sessionOnlyMiddleware.js');

module.exports = function (socketIo) {
  router.route('/')
    .get(async (req, res) => {
      const thePosts = await global.posts.find().toArray();
      res.send(thePosts);
    })
    .post(sessionOnlyMiddleware, async (req, res, next) => {
      const { validationErr } = postSchema.validate(req.body);
      if (validationErr) {
        const err = new Error(validationErr.details[0].message);
        err.statusCode = 403;
        return next(err);
      }
      req.body.author = req.session.cookie.user.username;
      req.body.date = new Date();
      const result = await global.posts.insertOne(req.body);

      if (!result.insertedId) {
        return next(new Error('Error, could not insert post!'));
      }
      req.body.id = result.insertedId;

      socketIo.emit('post', req.body);
      res.sendStatus(201);
    });

  return router;
};

const postSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  body: Joi.string().min(1).max(10000).required()
});
