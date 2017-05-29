var express = require('express')
var router = express.Router()
var passport = require('../../config/passport')

// register
router.post('/register', function(req, res, next) {
  passport.authenticate('register', function(err, user, info) {
    if(err) return next(err)
    if(user) return res.json({ message : 1 })
    else return res.json({ message : 0 })
  })(req, res, next)
})

// login
router.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info) {
    console.log("login post")
    console.log(user)
    if(err) res.json(err)
    if(user) return res.json(user)
    else return res.json({ message : 0 })
  })(req, res, next)
})

// modify
router.put('/id', function(req, res, next) {
  passport.authenticate('modify', function(err, user, info) {
    if(err) res.json(err)
  })
})

router.get('/', function(req, res, next) {
  res.render('login.ejs', {message : 'null'})
})

// api/v1/users/id/

module.exports = router


// 세션정보 확인
// 세션 저장되는 정보 추가
// request.session 확인
// user get router만들기
// users/id
// GET users/id/bookmark
// modify 먼저 만들고
// GET 만들기
