var express = require("express");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var path = require("path");

var Polls = require("./model/poll");
var User = require("./model/user");
var Count = require("./model/poll-count");
var key = require("./secretKey");

var router = express.Router();

router.get("/polls", function(req,res, next){
    Polls.find({}, function(err, polls){
        if (err) {
            return res.status(500).send(err);
        }
        res.json(polls);
    });
});

router.get("/detail/:id", function(req, res, next){
    Polls.findOne({id: req.params.id}, function(err, poll){
        if (err) {
            return res.json({error: err});;
        }
        res.json(poll);
    });
});

router.post("/poll", passport.authenticate('jwt', {session: false}), function(req, res, next){
    var poll = req.body;
    var newPoll = new Polls({
        username: poll.username,
        title: poll.title,
        id: poll.id,
        options: poll.options
    });
    return newPoll.save(function(err, data){
        if(err){
            return res.status(500).send(err);        }
        res.json({message: 'Document created.'});
    });
});

router.get("/poll-count", function(req, res, next){
    Count.find({}, function(err, count){
        if (err) return res.status(500).send(err);
        if (count[0]) {
            console.log(true)
            return res.json(count[0]);
        } else {
            console.log(false)
            var count = new Count({
                count: 0
            });
            count.save(function(err, done){
                if (err) return res.status(500).send(err);
                return res.json({count: 0});
            })
        }
    });
});

router.put("/poll-count", function(req, res, next){
    var count = req.body;
    Count.findOneAndUpdate({}, count, function(err, poll){
        if (err) return res.status(500).send(err);
        res.json({message: 'Poll count has been updated.'});
    });
});

router.get('/mypolls/:username', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Polls.find({username: req.params.username}, function(err, polls){
        if (err) return res.status(500).send(err);
        if (polls) {
            res.json(polls)
        }
    });
});

router.get("/mypoll/detail/:id", passport.authenticate('jwt', {session: false}), function(req, res, next){
    Polls.findOne({id: req.params.id}, function(err, poll){
        if (err) return res.status(500).send(err);
        res.json(poll);
    });
});

router.put("/mypolls/detail", function(req, res, next){
    var poll = req.body;
    Polls.findOneAndUpdate({_id: poll._id}, poll, function(err, poll){
        if (err) return res.status(500).send(err);
        res.json({message: 'Poll options have been updated.'});
    });
});

router.delete("/mypoll/:id", passport.authenticate('jwt', {session: false}), function(req, res, next){
    let id = req.params.id;
    Polls.findOneAndRemove({id: id}, function(err, poll){
        if (err) return res.status(500).send(err);
        res.json({'message': 'Document Removed'});
    });
});

router.post("/login", function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(err, user){
        if (err) return res.status(500).send(err);
        if (!user) {
            return res.json({error: "No such user found."});
        }
        user.checkPassword(password, function(err, isMatch){
            if (err) return res.status(500).send(err);
            if (isMatch) {
                var payload = {id: user._id};
                var token = jwt.sign(payload, key.secretKey);
                res.json({success: true, token: token});
            } else {
                res.json({error: "Password doesn't match."})
            }
        });
    });
});

router.post("/signup",function(req, res, next){
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
    }
    User.findOne({username: username}, function(err, user){
        if (err) return res.status(500).send(err);
        if (user) {
            return res.json({message: "This user already exists"});
        } else {
            var newUser = new User({
                username: username,
                password: password
            })
            newUser.save()
                .then(() => {
                User.findOne({username: username}, function(err, user){
                    if (user) {
                        var payload = {id: user._id};
                        var token = jwt.sign(payload, key.secretKey);
                        res.json({success: true, token: token});
                    } else {
                        res.json({success: false, message: 'No user found.'});
                    }
                })
            });
        }
    });
});

router.get("/edit-profile/:newUsername", function(req, res, next){
    var newUsername = req.params.newUsername;
    User.findOne({username: newUsername}, function(err, user){
        if (err) return res.status(500).send(err);
        if (user) {
            return res.json({error: 'Username already exists.'});
        } else {
            return res.json({success: true});
        }
    });
});

router.put("/edit-profile", passport.authenticate('jwt', {session: false}), function(req, res, next){
    var newUsername = req.body.newUsername;
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username}, function(err, user){
        if (err) { return res.json({error: err}); }
        user.checkPassword(password, function(err, isMatch){
            if (err) { return res.json({error: err}); }
            if (isMatch) {
                user.username = newUsername;
                user.save()
                    .then(() => {
                    Polls.update({ username: { $in: username }},
                                 { $set: { username: newUsername }},
                                 { multi: true })
                        .exec(function(err, polls){
                            if (err) return res.status(500).send(err);
                            res.json({success: true});
                        });
                    });
            } else {
                res.json({error: "Password doesn't match."});
            }
        });
    });
});

router.post("/edit-profile", passport.authenticate('jwt', {session: false}), function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    
    User.findOne({username: username}, function(err, user){
        if (err) return res.status(500).send(err);
        user.checkPassword(password, function(err, isMatch){
            if (err) return res.status(500).send(err);
            if (isMatch) {
                Polls.find({username: username}).remove().exec();
                user.remove();
                return res.json({success: true});
            } else {
                return res.json({error: "Password doesn't match."});
            }
        });
    });
});

router.get(["/",
            "/home",
            "/signup",
            "/login",
            "/poll-detail/:id",
            "/profile",
            "/mypolls",
            "/mypolls/detail/:id",
            "/edit",
            "/confirm-edits",
            "/delete-profile"], function(req, res, next){
    return res.sendFile("index.html", {root: path.join(__dirname, '/dist')});
});


module.exports = router;