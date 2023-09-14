const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
  })
  
router.post('/new', (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username
    });
    try {
        user.save();
        res.json(user);
    } catch (e) {
        console.log("Error", e)
    }
    
})
  
router.put('/update/:id', async (req, res) => {
    try {
        await User.updateOne({_id: req.params.id}, {$set: {name: req.body.name, username: req.body.username}});
    } catch (e) {
        console.log("error", e)
    }
    const updatedUserData = await User.findById(req.params.id);
    res.json(updatedUserData)
})

module.exports = router;