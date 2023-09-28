const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.post('/new', async (req, res) => {
    console.log(req.body)
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
            id: user._id
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
    res.header('auth-token', token).send(token);
})

router.put('/saveaffiliation', verifyToken, async (req, res) => {
    const decodedId = jwt.verify(req.token, process.env.TOKEN_SECRET);
    try {
        await User.updateOne({ _id: decodedId }, {
            $set: {
                affiliation: {
                    team: req.body.team,
                    color: req.body.color
                }
            }
        });
        const updatedUserData = await User.findById(decodedId);
        res.json(updatedUserData)

    } catch (e) {
        console.log("error", e)
    }
})

module.exports = router;