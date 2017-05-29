var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
//var User = require('../model/user')

passport.serializeUser(function(user, done) {
  console.log(serial)
  console.log(user)
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user)
  // })
  console.log(deser)
  console.log(id)
  done(null, id)
})


passport.use('login', new LocalStrategy( {
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  // User.findOne({ 'email' : email }, function(err, user) {
  //   if(err) return done(err)
  //   if(!user) return done(null, false)
  //   if(!user.validPassword(password)) return done(null, false)
  //   else {
  //     req.session.user = user
  //     return done(null, user)
  //   }
  // })
  console.log(email)

  if(email === "test") {

    return done(null, {id : email})
  } else {
    return done(null, false)
  }

}))

// req.user
module.exports = passport
