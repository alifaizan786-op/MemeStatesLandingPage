const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [
            true, "can't be blank"
        ],
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'is invalid']
    },
    password: {
        type: String,
        require: true,
        minlength: 5
    },
    profilePic: {
        type: String,
        default: 'https://drive.google.com/uc?id=1ZJafpk7VZaWjoPRgQGkEzfBCKZsX5MbL'
    },
    firstName: {
        type: String,
        lowercase: true,
        unique: true,
        required: [
            true, "can't be blank"
        ],
        match: [/^[a-z ,.'-]+$/, 'is invalid']
    },
    lastName: {
        type: String,
        lowercase: true,
        unique: true,
        required: [
            true, "can't be blank"
        ],
        match: [/^[a-z ,.'-]+$/, 'is invalid']
    },
    dateOfBirth: {
        type: Date
    },
    description: {
        type: String,
        trim: true,
        maxlength: 255
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    score: {
        type: Number
    }
})

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;
