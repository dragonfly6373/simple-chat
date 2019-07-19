var db = require("../mongodb/database.js");
var User = require("../mongodb/dao/user.js");
var Room = require("../mongodb/dao/room.js");

function createUser(req, res, next) {
    var data = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender
    };
    db.create(User, data, function(error) {
        if (err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "New User created successfully"
        });
    });
}

function getUserInfo(req, res, next) {
    var id = req.body.userId;
    db.getById(User, id, function(error, user) {
        if (error) {
            res.json({ error: error });
        }
        res.json(user);
    });
}

function updateUser(req, res, next) {
    db.updateById(User, id, data, function(error, user) {
        if (error) {
            res.json({error: error});
        }
        res.json(user);
    });
}

function getAllUser(req, res, next) {
    db.getAll(User, {}, function(error, users) {
        if (error) res.json({error: error});
        res.json({data: users});
    });
}

function createRoom(req, res, next) {
    var data = {
        name: req.body.name,
        title: req.body.title
    };
    db.create(Room, data, function(error) {
        if (error) res.json({error: error});
        res.json({message: "New Room created successfully"});
    });
}

module.exports = {
    createUser: createUser,
    getUserInfo: getUserInfo,
    updateUser: updateUser,
    getAllUser: getAllUser,
    createRoom: createRoom
};
