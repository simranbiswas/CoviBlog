const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput, validateLoginInput} = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const Account = require('../../models/Account');


function generateToken(user){
    return jwt.sign(
    {
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY, 
    {expiresIn: '1h'}
    );

}

module.exports = {
    Mutation: {
        async login(_, {username, password }){
            
            const { errors, valid } = validateLoginInput(username, password);
            
            if(!valid){
                errors.general = 'Invalid User';
                throw new UserInputError('Invalid User', {errors});
            }

            const user = await User.findOne({username});

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Wrong Credentials';
                throw new UserInputError('Wrong Credentials', {errors});
            }

            const token = generateToken(user);

            console.log('logging in');
            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(_, { registerInput: {username,name,email,bio,avatar,password,confirmPassword}}, 
            context, 
            info
            ){
            // TODO validate user data
            const {valid, errors } = validateRegisterInput(username,name,email,bio,avatar,password,confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', {errors});
            }
            
            // TODO makes sure user doesn't already exist
            const user = await User.findOne({ username });
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                name,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const usernew = await User.findOne({username});
            const uid = usernew.id;
            if(usernew){
                const account = new Account({
                    user: uid,
                    username: username,
                    avatar: avatar,
                    bio: bio,
                    name: name,
                    joinedAt: new Date().toISOString()
                });
                await account.save();
            }  
            
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },
        
    }
};