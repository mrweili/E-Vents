var express = require('express'),
    router = express.Router(),
    Post = require('../models/post.js');
    User = require('../models/user.js');

router.post('/register', function(req, res) {
    Post.create({ 
        name: req.body.name, 
        location: req.body.location,
        date: req.body.date,
        cost: req.body.cost,
        likes: 0,
        comments: [],
        creator: req.body.creator,
        attendance: [req.body.creator]
    }, function(err, post) {
        if (err) return res.status(409).send({err: err}); 
        User.update({ username: req.body.creator }, { $push: { attendance: post.id } }, function(err) {
            if (err) return res.status(400).send({err: err});
            return res.status(200).send(post);

        });
    })
});

router.get('/all', function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) return res.status(409).send({err: err}); 
        return res.status(200).send(posts);
    })
});

router.get('/:id', function(req, res) {
    Post.findOne({ _id: req.params.id }, function(err, post) {
        if (err) return res.status(409).send({err: err});
        return res.status(200).send(post);
    });
});

router.get('/name/:name', function(req, res) {
    Post.find({ name: req.params.name }, function(err, posts) {
        if (err) return res.status(409).send({err: err});
        return res.status(200).send(posts)
    });
});

router.get('/location/:location', function(req, res) {
    Post.find({ location: req.params.location }, function(err, posts) {
        if (err) return res.status(409).send({err: err});
        return res.status(200).send(posts)
    });
});

router.post('/join', function(req, res) {
    Post.update({ _id: req.body.id }, { $push: { attendance: req.body.user } }, function(err) {
        if (err) return res.status(400).send({err: err});
        return res.send(200);
    });
});

router.post('/comment', function(req, res) {
    Post.update({ _id: req.body.id }, { $push: { comments: { username: req.body.user, comment: req.body.comment } } }, function(err) {
        if (err) return res.status(400).send({err: err});
        return res.send(200);
    });
});

router.post('/like', function(req, res) {
    Post.findByIdAndUpdate(
        req.body.id,
        { $inc: { likes: 1 }},
        { new: true, safe: true, upsert: true },
        function(err, post) {
            if (err) return res.status(400).send({err: err});
            User.update({ username: req.body.user }, { $push: { likes: post } }, function(err) {
                if (err) return res.status(400).send({err: err});
            });
            return res.send(200);
        }
    );
});

router.post('/unlike', function(req, res) {
    Post.findByIdAndUpdate(
        req.body.id,
        { $inc: { likes: -1 }},
        { new: true, safe: true, upsert: true },
        function(err, post) {
            if (err) return res.status(400).send({err: err});
            User.update({ username: req.body.user }, { $pull: { likes: post} }, function(err) {
                if (err) return res.status(400).send({err: err});
            });
            return res.send(200);
        }
    );
});

module.exports = router;