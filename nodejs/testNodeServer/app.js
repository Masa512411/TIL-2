var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')

app.listen(3000, function() {
  console.log('start 3000 port!')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true
  // 타임아웃 maxage??
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)
