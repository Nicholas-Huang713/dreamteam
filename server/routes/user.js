const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.post('/new', async (req, res) => {
    console.log(req.body)
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json('Email already exists');
    // let hashedPassword;
    // try {
    //     // Generate a salt asynchronously
    //     const saltRounds = 10; // Number of salt rounds
    //     const salt = await bcrypt.genSalt(saltRounds);
    //     // Hash the plaintext password with the generated salt
    //     hashedPassword = await bcrypt.hash(req.body.password, salt);
    // } catch (error) {
    //     console.error('Error:', error);
    //     throw error; // Handle the error appropriately
    // }

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

// router.post('/login', async (req, res) => {
// const user = await User.findOne({email: req.body.email});
//     const user = new User({
//         email: req.body.email,
//         password: req.body.password
//     });
//     try {
//         user.save();
//         res.json(user);
//     } catch (e) {
//         console.log("Error", e)
//     }
// })

// router.put('/update/:id', async (req, res) => {
//     try {
//         await User.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, username: req.body.username } });
//     } catch (e) {
//         console.log("error", e)
//     }
//     const updatedUserData = await User.findById(req.params.id);
//     res.json(updatedUserData)
// })

module.exports = router;