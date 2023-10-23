const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Team = require('../models/Team');
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
        newTeam.save()
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
    console.log('addPlayer called')
    console.log('reqBody', req.body)
    const teamToSave = await Team.findOne({ teamName: req.body.teamName });
    const teamRoster = teamToSave.roster;
    console.log('teamRoster', teamRoster)
    if (teamRoster.length === 0) hasPlayer = false;
    else hasPlayer = teamRoster.some(player => player.playerID === req.body.playerID);
    if (hasPlayer) return res.status(400).send('Player already in roster');
    if (teamRoster.length === 5) return res.status(400).send('Team roster limit reached. Choose another team');
    try {
        await Team.updateOne({ teamName: req.body.teamName }, {
            $push: {
                roster: req.body
            }
        });
        const updatedTeamList = await Team.find({ ownerId: decodedId });
        res.json(updatedTeamList)

    } catch (e) {
        console.log("error", e)
    }
})

router.get('/getownedteams', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);

    const ownedTeams = await Team.find({ ownerId: decodedId });
    res.json(ownedTeams);
})

module.exports = router;