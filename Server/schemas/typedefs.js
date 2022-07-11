const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id : ID
        username : String
        email : String
        password : String
        profilePic : String
        firstName : String
        lastName : String
        dateOfBirth : String
        description : String
        followers: [User]
        score: Int
    }

    type Session {
        _id : ID
        timeOpened : String
        timezone:  String
        locationPathname : String
        referrer : String
        history : String
        Language : String
        OnLine : Boolean
        Platform : String
        JavaEnabled : Boolean
        CookieEnabled : Boolean
        documentCookie : String
        screenWidth : Int
        screenHeight : Int
        documentWidth : Int
        documentHeight : Int
        innerHeight : Int
        innerWidth : Int
        screenAvailWidth : Int
        screenAvailHeight : Int
        architecture : String
        browser : String
        browserV : Int
        operatingSystem : String
        country : String
    }

    type Auth{
        token : ID
        user : User
    }

    type Query{
        users : [User]
        sessions : [Session]
    }

    type Mutation{
        addUser(
            username:String!,
            firstName:String!,
            lastName:String!,
            email:String!,
            password:String!,
            profilePic:String,
            dateOfBirth:String!,
        ) : User

        login( 
            username : String!,
            email : String!, 
            password: String!
        ): Auth

        updatePassword(
            _id:ID,
            oldPassword:String
            newPassword:String
        ) : User
    }
`

module.exports = typeDefs