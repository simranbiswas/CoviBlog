const { AuthenticationError, UserInputError } = require('apollo-server');

const Chats = require('../../models/Chats');
const Post = require('../../models/Post');

const checkAuth = require('../../util/check-auth');
const User = require('../../models/User');


module.exports = {
    Query:{
        async getChats(){
            console.log('getChats');
            try{
                const chats = await Chats.find().sort();
                return chats;
            } catch(err){
                throw new Error(err);
            }
        },
    },
    Mutation:{
        createChat: async (_, { username, body }, context) => {

        if (body.trim() === '') {
            throw new UserInputError('Empty comment', {
            errors: {
                body: 'Comment body must not empty'
            }
            });
        }
         const newChat= new Chats({
                body: body,
                username: username,
                createdAt: new Date().toISOString()
            });
            const chat = await newChat.save();
            return chat;
        
        },
        async deleteChat(_, { chatId }, context) {
            const user = checkAuth(context);

            try {
                const chat = await Chats.findById(chatId);
                if (user.username === chat.username) {
                await chat.delete();
                return 'Post deleted successfully';
                } else {
                throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};