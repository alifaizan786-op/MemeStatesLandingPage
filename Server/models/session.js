const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const sessionSchema = new Schema({
    timeOpened: {
        type : Date,
    }, //string
    timezone: {
        type : String
    },//int
    locationPathname: {
        type : String
    },//string
    referrer : {
        type : String
    },//string
    history : {
        type : String
    },//string
    Language : {
        type : String
    },//string
    OnLine : {
        type : Boolean
    },//Boolean
    Platform : {
        type : String
    },//string
    JavaEnabled : {
        type : Boolean
    },//Boolean
    CookieEnabled : {
        type : Boolean
    },//Boolean
    documentCookie : {
        type : String
    },//string
    screenWidth : {
        type : Number
    },//int
    screenHeight : {
        type : Number
    },//int
    documentWidth : {
        type : Number
    },//int
    documentHeight : {
        type : Number
    },//int
    innerHeight : {
        type : Number
    },//int
    innerWidth : {
        type : Number
    },//int
    screenAvailWidth : {
        type : Number
    },//int
    screenAvailHeight : {
        type : Number
    },//int
    architecture : {
        type : String
    },//string
    browser : {
        type : String
    },//string
    browserV : {
        type : Number
    },//int
    operatingSystem : {
        type : String
    },//string
    country : {
        type : String
    },//string

})



const Session = model('Session', sessionSchema);

module.exports = Session;
