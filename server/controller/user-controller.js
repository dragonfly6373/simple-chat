var db = require("../mongodb/database.js");
var User = require("../mongodb/dao/user.js");

function createUser(data, callback) {
    db.create(User, data, function(error) {
        if (error) callback({error: error});
        else callback({message : "New User created successfully"});
    });
}

function getUserInfo(id, callback) {
    db.getById(User, id, function(error, user) {
        if (error) callback({error: error});
        else callback(user);
    });
}

function updateUser(id, data, callback) {
    db.updateById(User, id, data, function(error, user) {
        if (error) callback({error: error});
        else callback(user);
    });
}

function getAllUser(callback) {
    db.getAll(User, {}, function(error, users) {
        if (error) callback({error: error});
        else callback({data: users});
    });
}

function deleteUser(id, callback) {
    db.deleteById(User, id, function(error, user) {
        if (error) callback({error: error});
        else callback(user);
    });
}

module.exports = {
    createUser: {method: "post", implementation: createUser, authentication: function(req, res) { return true; }},
    updateUser: {method: "post", implementation: updateUser, authentication: function(req, res) { return true; }},
    deleteUser: {method: "post", implementation: deleteUser, authentication: function(req, res) { return true; }},
    getUserInfo: {method: "get", implementation: getUserInfo, authentication: function(req, res) { return true; }},
    getAllUser: {method: "get", implementation: getAllUser, authentication: function(req, res) { return true; }}
};
