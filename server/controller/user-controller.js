var db = require("../mongodb/database.js");
var User = require("../mongodb/dao/user.js");

function createUser(data, callback) {
    db.getAll(User, {email: data.email}, function(error, data) {
        if (error || data.length) callback({error: "Fail to create user data. Please check your in put email and try again."});
        else {
            db.create(User, data, function(error) {
                if (error) callback({error: error});
                else callback({message : "New User created successfully"});
            });
        }
    });
}

function login(email, password, callback) {
    db.getAll(User, {email: email, password: password}, function(error, data) {
        if (error || data.length == 0) callback({error: "Login fail! Please check your email and password and try again."});
        else {
            callback({user_info: data[0]});
        }
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
    createUser: {method: "post", implementation: createUser, authentication: function(req) { return true; }},
    updateUser: {method: "post", implementation: updateUser, authentication: function(req) { return true; }},
    deleteUser: {method: "post", implementation: deleteUser, authentication: function(req) { return true; }},
    login: {method: "post", implementation: login, authentication: function(req) { return true; }},
    getUserInfo: {method: "get", implementation: getUserInfo, authentication: function(req) { return true; }},
    getAllUser: {method: "get", implementation: getAllUser, authentication: function(req) { return true; }}
};
