const User = require('../models/User')

const createUser = async (req, res, next) => {
  try {

    const { firstName, lastName, username, email, password } = req.body

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    })

    const createdUser = await newUser.save()

    return res.status(201).json({
      status: true,
      data: createdUser,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createUser,
}
