const express = require('express');
const router = express.Router();
const Joi = require('joi');
const sessionOnlyMiddleware = require('../sessionOnlyMiddleware.js');
const Mongo = require('mongodb');

module.exports = function (socketIo) {
    router.route('/:id')
        .post(sessionOnlyMiddleware, async (req, res, next) => {
            const { validationErr } = commentSchema.validate(req.body);
            if (validationErr) {
                const err = new Error(validationErr.details[0].message);
                err.statusCode = 403;
                return next(err);
            }
            req.body.author = req.session.username;
            req.body.date = new Date();

            let currentPost = await global.posts.findOne({ _id: new Mongo.ObjectId(req.params.id) });
            if (currentPost.comments) {
                req.body.id = currentPost.comments.length;
            }
            else {
                req.body.id = 0;
            }

            const result = await global.posts.updateOne({ _id: new Mongo.ObjectId(req.params.id) }, { $push: { comments: req.body } });
            if (result.modifiedCount === 0) {
                return next(new Error('Error, could not insert comment!'));
            }

            req.body.post = req.params.id;
            socketIo.emit('comment', req.body);
            res.sendStatus(201);
        });

    return router;
};
const commentSchema = Joi.object({
    body: Joi.string().min(1).max(1000).required()
});