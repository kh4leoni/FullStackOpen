
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const foundUsers = await User.find({}).populate('blogs')

  res.json(foundUsers)
})


userRouter.post('/', async (req, res) => {
 
  const { username, name, password } = req.body




  if (password.length < 3) {
    res.status(400).json(error)
  }

  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  

    const savedUser = await user.save()
  
    res.status(201).json(savedUser)
})

module.exports = userRouter
