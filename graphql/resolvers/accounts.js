const { AuthenticationError, UserInputError } = require('apollo-server');

const Account = require('../../models/Account');
const Post = require('../../models/Post');

const checkAuth = require('../../util/check-auth');
const User = require('../../models/User');

module.exports = {
    Query:{
        async viewProfile(_, { username }){
            console.log('viewProfile');
            try{
                const profile = await Account.findOne({username});
                const posts = await Post.find({username});
                return {
                    ...profile._doc,
                    id: profile._id,
                    posts
                };
            } catch(err){
                throw new Error(err);
            }
        },
    },
    Mutations:{
    /*    async followUser(_, { postId }, context) {
        console.log('follow');
        const { username,name } = checkAuth(context);    //my username
        try{
            const post = await Post.findById(postId);
            if(post){
                const fuser = await Account.findOne(post.username);
                const muser = await Account.findOne(username);
                fusername = fuser.username;
                fname = fuser.name;
                if(fuser){
                    if(fuser.followers.find((followers)=> followers.username === username)){
                        fuser.followers = fuser.followers.filter((followers) => followers.username !== username);
                        muser.following = muser.following.filter((following) => following.username !== fusername);
                    }else{
                        fuser.followers.push({
                            username,
                            name
                        });
                        muser.following.push({
                            fusername,
                            fname
                        });
                    }
                }
                await fuser.save();
                await muser.save();
                return muser;
            }
            else{
                throw new Error('Post not found');
            }
        } catch(err){
                throw new Error(err);
            }
           
        },*/
       
    },
};
