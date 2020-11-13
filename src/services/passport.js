const User = require('../models/user')
const dotenv = require ('dotenv')
dotenv.config()
// const config = require('../config/dev')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
      User.findAll({where: { id: jwt_payload.id}})
        .then((user) => {
          if(user) {
            return done(null, user)
          }
          return done(null, false)
        }).catch((err) => {
          console.log((err));
    })
    })
  )
}
