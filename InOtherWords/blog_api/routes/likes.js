const express = require('express');
const router = express.Router();
const Joi = require('joi');
const sessionOnlyMiddleware = require('../sessionOnlyMiddleware.js');
const Mongo = require('mongodb');

module.exports = function (socketIo) {
    router.post('/:id', async (req, res, next) => {
        let currentPost = await global.posts.findOne({ _id: new Mongo.ObjectId(req.params.id) });
        if (req.body.type === 'like') {
            const result = await global.posts.updateOne({ _id: new Mongo.ObjectId(req.params.id) }, { $set: { likes: req.body.count } });
            if (result.modifiedCount === 0) {
                return next(new Error(`Error, could not add ${req.body.type}!`));
            }
        }
        else if (req.body.type === 'dislike'){
            const result = await global.posts.updateOne({ _id: new Mongo.ObjectId(req.params.id) }, { $set: { dislikes: req.body.count } });
            if (result.modifiedCount === 0) {
                return next(new Error(`Error, could not add ${req.body.type}!`));
            }
        }
        req.body.post = req.params.id;
        socketIo.emit(`${req.body.type}`, req.body);
        res.sendStatus(201);
    });

    return router;
};
