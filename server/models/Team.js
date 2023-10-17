const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    ownerId: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    roster: {
        type: Object,
        default: [],
        required: false
    },
    date: {
        type: String,
        default: Date.now()
    }
})

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;