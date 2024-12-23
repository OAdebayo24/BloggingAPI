const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    
    const authorization = req.get('authorization')
    if (!(authorization && authorization.toLowerCase().startsWith('bearer'))) {
      throw new Error()
    }
    const bearerToken = authorization.substring(7)

    
    const userFromToken = jwt.verify(bearerToken, process.env.SECRET)
    const user = await User.findById(userFromToken.id)
    if (!user) {
      throw new Error()
    }

    
    req.user = user
    next()
  } catch (err) {
    err.source = 'jwt middleware error'
    next(err)
  }
}
