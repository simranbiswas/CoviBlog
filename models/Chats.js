const { model, Schema } = require('mongoose');

const chatSchema = new Schema({
    body: String,
    username: String,
    createdAt: String
});

module.exports = model('Chats', chatSchema);