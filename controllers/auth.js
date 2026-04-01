const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../model/User')

// POST /auth/sign-up
router.post('/sign-up', async (req,res)=>{
    // 1. verify that the username doesn't already exist in the Database
    const foundUser = await User.findOne({username:req.body.username})

    if(foundUser){
        return res.status(409).json({err:'Username taken please sign in or Sign up with different username'})
    }

    // 2. save the user in the Database with the encrypted password
    const createdUser = await User.create({
        username: req.body.username,
        hashedPassword: bcrypt.hashSync(req.body.password,12)
    })

    const userObject = createdUser.toObject()
    delete userObject.hashedPassword
    // 3. send back the created user
    res.status(201).json({user:userObject})
})

// POST /auth/login





module.exports = router