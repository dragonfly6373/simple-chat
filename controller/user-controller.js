var db = require("../mongodb/database.js");
var User = require("../mongodb/dao/user.js");

function createUser(data, callback) {
    console.log("create user data:", data);
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
    console.log("callback:", typeof(callback), callback);
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
    createUser: {method: "post", implementation: createUser},
    updateUser: {method: "post", implementation: updateUser},
    deleteUser: {method: "post", implementation: deleteUser},
    getUserInfo: {method: "get", implementation: getUserInfo},
    getAllUser: {method: "get", implementation: getAllUser}
};
