const {Session, User} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        users: async () => {
            const allUsers = await User.find({}).populate('followers')
            return allUsers
        },
        sessions: async () => {
            const allSessions = await Session.find({})
            return allSessions
        }
    },
    Mutation: {
        addUser: async (parent, {
            username,
            firstName,
            lastName,
            email,
            password,
            profilePic,
            dateOfBirth
        }) => {
            const newUser = await User.create({
                username,
                firstName,
                lastName,
                email,
                password,
                profilePic,
                dateOfBirth
            })
            return newUser
        },
        login: async(parent,{username,email,password})=>{
            if(username){
                const user = await User.findOne({username})
            } else {
                const user = await User.findOne({email})
            }
            

            if(!user){
                throw new AuthenticationError('The Credential You Have Used Are Incorrect');
            }
                
            const correctPassword = await user.isCorrectPassword(password)

            if(!correctPassword){
                throw new AuthenticationError('The Credential You Have Used Are Incorrect')
            }

            const token = signToken(user);

            return{user, token};
        },
        updatePassword: async(parent,{_id,oldPassword, newPassword})=>{


            const user = await User.findOne({_id})
            const correctPassword = await user.isCorrectPassword(oldPassword)
            
            if(!correctPassword){
                throw new AuthenticationError('Password is Incorrect')
            }else{
            const saltRound = 10
            const encryptPassword =  await bcrypt.hash(newPassword, saltRound)
            const changePass = await User.findOneAndUpdate({_id},{password:encryptPassword})
            }
            return changePass
        },
    }
}

module.exports = resolvers
