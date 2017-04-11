var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.listen('4000', function() {
  console.log('Server Start Port 4000!')
})


app.get('/', function(req, res) {
  // var user = {username : "", password : ""}
  // if(req.user) {
  //   user.username = req.user.username
  //   user.password = req.user.password
  // }
  if(!req.user) res.redirect('/login')

  res.render('index.ejs', {'id' : req.user.username, 'password' : req.user.password})
})



app.get("/:id", function(req, res) {
  console.log(req.params)
  res.send('Hello' + req.params.id + '!!')
})

app.get('/main', function(req, res) {
  res.send('main')
})



app.get('/login', function(req, res) {
  var msg
  var errMsg = req.flash('error')
  if(errMsg) msg = errMsg
  res.render('login.ejs', {message : msg})
})

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

passport.use('local-login', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, username, password, done) {
  var id = "test"
  var pass = "test"
  if(id !== username) {

    return done(null, false, {message : "wrong id"})
  } else if (pass !== password) {

    return done(null, false, {message : "wrong pass"})
  }

  return done(null, {'username' : username, 'password' : password})
}
))

app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',  // 성공했을시
  failureRedirect : '/login',  // 실패했을시
  failureFlash : true
}))

app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})
