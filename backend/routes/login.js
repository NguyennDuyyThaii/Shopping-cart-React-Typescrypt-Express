const express = require('express')
const { User } = require('../models/user')
const genAuthToken = require('../Utils/auth')

const router = express.Router()

router.post('/', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('wrong member')
    const token = genAuthToken(user)
    res.send(token)
})

module.exports = router