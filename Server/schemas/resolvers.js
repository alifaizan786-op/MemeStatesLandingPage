const { Session, User} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
    Query : {
        users : async () => {
            const allUsers = await User.find({}).populate('followers')
            return allUsers
        },
        sessions : async () => {
            const allSessions = await Session.find({})
            return allSessions
        }

    }
}

module.exports = resolvers