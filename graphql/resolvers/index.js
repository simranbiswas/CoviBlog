const postsResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');
const accountsResolvers = require('./accounts');
const chatsResolvers = require('./chats');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) =>  parent.comments.length
    },
    Query: {
        ...postsResolvers.Query,
        ...accountsResolvers.Query,
        ...chatsResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...accountsResolvers.Mutation,
        ...chatsResolvers.Mutation
    },
    Subscription:{
        ...postsResolvers.Subscription
    }
};
