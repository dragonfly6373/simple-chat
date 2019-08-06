var db = require("../mongodb/database.js");
var User = require("../mongodb/dao/user.js");
var Room = require("../mongodb/dao/room.js");

function createRoom(data, callback) {
    db.create(Room, data, function(error) {
        if (error) callback({error: error});
        else callback({message : "New Room created successfully"});
    });
}

function friendReques(id, callback) {
    
}

function joinChat(id, callback) {
    db.updateById(User, id, {$set: {dt_last_login: new Date()}}, function(error, user) {
        if (error) callback({error: error});
        else callback(user);
    });
}

function getGroupInfo(id, callback) {
    db.getById(Room, id, function(error, data) {
        if (error) callback({error: error});
        else callback(data);
    });
}

function kickUser(id, callback) {
    // only room admin can perform
}

function sendMessageTo(from, to, message, callback) {
    // log conservation history.
}

function getGroupMembers(groupId, callback) {
    // list all members in group
}

function searchLog(id, keyword, callback) {
    // search in conservation history by keyword
}

module.exports = {
    createRoom: {method: "get", implementation: createRoom},
    joinChat: {method: "get", implementation: joinChat},
    sendMessageTo: {method: "get", implementation: sendMessageTo},
    getGroupInfo: {method: "get", implementation: getGroupInfo},
    getGroupMembers: {method: "get", implementation: getGroupMembers},
    searchLog: {method: "get", implementation: searchLog}
};
