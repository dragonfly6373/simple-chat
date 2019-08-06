exports.properties = require('./properties.js');
exports.serviceBuilder = require('./service/ServiceBuilder.js');
exports.mongodb = require('./mongodb/database.js');
exports.authentication = require('./service/SecurityUtil.js');
exports.controller = {
    chat: require('./controller/chat-controller.js'),
    user: require('./controller/user-controller.js')
};