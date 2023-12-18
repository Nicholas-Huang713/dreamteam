const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Team = require('../models/Team');
const Game = require('../models/Game');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.get('/getuser', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: decodedId });
    res.json(user);
})

router.post('/new', async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json('Email already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        const data = {
            token,
            id: user._id,
            user
        }
        res.header('auth-token', token).send(data);
        // res.json(user);
    } catch (e) {
        console.log("Error", e);
        res.status(500).json({ error: 'Server error' });
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid email or password');
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    const data = {
        token,
        user
    }
    res.header('auth-token', token).send(data);
})

router.put('/updateuser', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    try {
        await User.updateOne({ _id: decodedId }, {
            $set: req.body
        });
        const updatedUserData = await User.findById(decodedId);
        res.json(updatedUserData)
    } catch (e) {
        console.log("error", e)
    }
})

router.put('/saveaffiliation', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    try {
        await User.updateOne({ _id: decodedId }, {
            $set: {
                affiliation: {
                    team: req.body.team,
                    color: req.body.color,
                    displayName: req.body.displayName,
                    abbr: req.body.abbr
                }
            }
        });
        const updatedUserData = await User.findById(decodedId);
        res.json(updatedUserData)

    } catch (e) {
        console.log("error", e)
    }
})

router.put('/createteam', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    const loggedUser = await User.findOne({ _id: decodedId });
    let hasSameName;
    const allTeams = await Team.find();
    if (allTeams.length === 0) hasSameName = false;
    else hasSameName = allTeams.some((team) => team.teamName === req.body.teamName)
    if (hasSameName) return res.status(400).send('Team name already in use');
    const newTeam = new Team({
        ownerId: decodedId,
        owner: loggedUser.firstName,
        teamName: req.body.teamName,
        color: req.body.color,
    });
    try {
        await newTeam.save()
        const updatedTeamList = await Team.find({ ownerId: decodedId });
        const currentUpdatedTeam = await Team.findOne({ teamName: req.body.teamName });
        res.json({
            updatedTeamList,
            newTeamId: currentUpdatedTeam.id,
            newTeamName: currentUpdatedTeam.teamName
        });
    } catch (e) {
        console.log("error", e)
    }
})

router.put('/addplayer', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    let hasPlayer;
    const teamToSave = await Team.findOne({ teamName: req.body.teamName });
    const teamRoster = teamToSave.roster;
    if (teamRoster.length === 0) hasPlayer = false;
    else hasPlayer = teamRoster.some(player => player.playerID === req.body.playerID);
    if (hasPlayer) return res.status(400).send('Player already in roster');
    if (teamRoster.length === 5) return res.status(400).send('Team roster limit reached. Choose another team');
    const loggedUser = await User.findOne({ _id: decodedId });
    if (loggedUser.currency < req.body.cost) res.status(400).send('Insufficient funds');
    const updatedCurrency = loggedUser.currency - req.body.cost;
    try {
        await Team.updateOne({ teamName: req.body.teamName }, {
            $push: {
                roster: req.body
            }
        });
        await User.updateOne({ _id: decodedId }, {
            $set: {
                currency: updatedCurrency
            }
        });
        const updatedTeamList = await Team.find({ ownerId: decodedId });
        const updatedUserData = await User.findOne({ _id: decodedId });
        res.json({
            updatedUserData,
            updatedTeamList
        });

    } catch (e) {
        console.log("error", e)
    }
})

router.put('/removeplayer', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    let hasPlayer;
    const teamToSave = await Team.findOne({ teamName: req.body.teamName });
    const teamRoster = teamToSave.roster;
    if (teamRoster.length === 0) hasPlayer = false;
    else hasPlayer = teamRoster.some(player => player.playerID === req.body.playerID);
    if (!hasPlayer) return res.status(400).send('No player available to remove');

    try {
        await Team.updateOne({ teamName: req.body.teamName }, {
            $pull: {
                roster: {
                    playerID: req.body.playerID
                }
            }
        });

        const updatedTeamList = await Team.find({ ownerId: decodedId });
        res.json(updatedTeamList)

    } catch (e) {
        console.log("error", e)
    }
})

router.post('/playgame', verifyToken, async (req, res) => {
    //subtract funds 
    //create new Game
    //calculate score
    const { avgPts, results } = req.body;
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    const loggedUser = await User.findOne({ _id: decodedId });
    if (loggedUser.currency < 5) res.status(400).send('Insufficient funds');
    const updatedCurrency = loggedUser.currency - 5;
    try {
        await User.updateOne({ _id: decodedId }, {
            $set: {
                currency: updatedCurrency
            }
        });
        const totalPts = results.reduce((accum, result) => accum + result.dreamTeamPts, 0);
        let isWinner;
        let amountWon = 0;
        if (totalPts <= avgPts) {
            isWinner = false
        } else {
            isWinner = true;
            const winningAmt = Math.ceil((totalPts - avgPts) * 2);
            amountWon = winningAmt;
            const _loggedUser = await User.findOne({ _id: decodedId });
            const currencyWithWinnings = _loggedUser.currency + winningAmt;
            await User.updateOne({ _id: decodedId }, {
                $set: {
                    currency: currencyWithWinnings
                }
            });
        }
        const game = new Game({
            totalPts,
            avgPts,
            winnings: {
                winner: isWinner,
                amountWon
            },
            ...req.body
        });
        await game.save();
        const allGames = await Game.find();
        const gamesPlayedByUser = await Game.find({ ownerId: decodedId })
        const updatedUserData = await User.findOne({ _id: decodedId });
        const resData = {
            updatedUserData,
            game,
            gamesPlayedByUser,
            allGames,
            winnings: {
                winner: isWinner,
                amountWon
            }
        }
        res.json(resData)
    } catch (e) {
        console.log("error", e)
    }
})

router.get('/getownedteams', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    const ownedTeams = await Team.find({ ownerId: decodedId });
    res.json(ownedTeams);
})

router.get('/getallgames', verifyToken, async (req, res) => {

    const ownedTeams = await Game.find();
    res.json(ownedTeams);
})

router.get('/getgamesplayed', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    const gemesPlayed = await Game.find({ ownerId: decodedId }).sort({ date: -1 });
    res.json(gemesPlayed);
})

router.get('/gettopgames', verifyToken, async (req, res) => {

    const topGames = await Game.find()
        .sort({ totalPts: -1 })
        .limit(5)
    res.json(topGames);
})


// router.get('/getcurrentgamespreview', verifyToken, async (req, res) => {

//     const currentGamesPreview = await Game.find().sort({

//     });
//     res.json(ownedTeams);
// })


module.exports = router;