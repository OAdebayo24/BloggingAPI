const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    },
  ],
})


UserSchema.pre('save', function (next) {
  let user = this


  if (!user.isModified('password')) return next()

 
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)


    user.password = hash
    next()
  })
})


UserSchema.methods.passwordIsValid = function (password) {
  
  const passwordHash = this.password
  return new Promise((resolve, reject) => {

    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }
      resolve(same)
    })
  })
}

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.password
  },
})

module.exports = mongoose.model('User', UserSchema)
