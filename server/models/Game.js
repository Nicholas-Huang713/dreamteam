const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
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
    results: {
        type: Object,
        default: [],
        required: false
    },
    totalPts: {
        type: Number,
        default: 0,
        required: true
    },
    avgPts: {
        type: Number,
        default: 0,
        required: true
    },
    winnings: {
        type: Object,
        default: {},
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }
})

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;