const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    affiliation: {
        type: Object,
        default: {
            team: '',
            color: '',
            displayName: '',
            abbr: ''
        },
        required: false
    },
    managedTeams: {
        type: Object,
        default: [],
        required: false
    },
    currency: {
        type: Number,
        default: 500,
        required: false
    },
    gameHistory: {
        type: Object,
        default: [],
        required: false
    },
    date: {
        type: String,
        default: Date.now()
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;