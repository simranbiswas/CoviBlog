const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        avatar: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Account{
        id: ID!
        username: String!
        avatar: String!
        bio: String!
        name: String!
        joinedAt: String!
        posts: [Post]!
    }
    type Chat{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }
    type User{
        id: ID!
        email: String!
        name: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        name: String!
        password: String!
        confirmPassword: String!
        email: String!
        bio: String!
        avatar: String!
    }
    type Query{
        getPosts: [Post]
        getChats: [Chat]
        getPost(postId: ID!): Post
        viewProfile(username: String!): Account!
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        createChat(username: String!, body: String!): Chat!
        deleteChat(chatId: ID!): String!
    }
    type Subscription{
        newPost: Post!
    }
`;
