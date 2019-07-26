var DataAdapter = require("../mongodb/database.js");
var User = require("../mongodb/model/User.js");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
function createUser(data, callback) {
    db = new DataAdapter();
    db.create(User, data, function(error) {
        if (err) callback({error: error});
        else callback({message : "New User created successfully"});
    });
}

function getUserInfo(id, callback) {
    db = new DataAdapter();
    db.getById(User, id, function(error, user) {
        if (error) callback({ error: error });
        else callback(user);
    });
}

function updateUser(id, callback) {
    db = new DataAdapter();
    db.updateById(User, id, data, function(error, user) {
        if (error) callback({error: error});
        else callback(user);
    });
}

function getAllUser(callback) {
    db = new DataAdapter();
    console.log("db", typeof(db));
    db.getAll(User, {}, function(error, users) {
        if (error) callback({error: error});
        else callback({data: users});
    });
    // User.getAll({}, function(error, users) {
    //     if (error) calback({error: error});
    //     else callback({data: users});
    // });
}

function deleteUser(id, callback) {
    db = new DataAdapter();
    db.deleteById(User, id, function(error, user) {
        if (error) callback({error: error});
        else callback(user);
    });
}

module.exports = {
    createUser: createUser,
    getUserInfo: getUserInfo,
    updateUser: updateUser,
    getAllUser: getAllUser,
    deleteUser: deleteUser
};
