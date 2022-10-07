const express = require('express')
const { User } = require('../models/user')
const genAuthToken = require('../Utils/auth')

const router = express.Router()

router.post('/', async (req,res) => {
    const body = new User()
    body.name = req.body.name
    body.email = req.body.email
    body.password=req.body.password
    
    const check = await User.findOne({email: req.body.email})
    if(check) return res.status(400).send('Email already existed !')
    let user = await body.save()
    const token = genAuthToken(user)
    res.send(token)
})

module.exports = router