const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kedari:kedari@moneytransfer.6wwyx4w.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Mongo db connection error"));
db.once('open', () => {
    console.log("connection successful with db")
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 30
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 30
    },
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    balance: {
        type: Number,
        required: true,
    }
})

const Account = mongoose.model('Account', accountSchema)
const User = mongoose.model('user', userSchema)

module.exports = {
    User, Account
}
