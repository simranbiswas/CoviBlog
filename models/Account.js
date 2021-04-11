const { model, Schema } = require('mongoose');

const accountSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username: String,
    avatar: String,
    bio: String,
    name: String,
    joinedAt: String
    
});

module.exports = model('Account', accountSchema);