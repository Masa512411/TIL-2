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

app.listen('9000', function() {
  console.log('Server Start Port 4000!')
})


app.get('/', function(req, res) {
  // var user = {username : "", password : ""}
  // if(req.user) {
  //   user.username = req.user.username
  //   user.password = req.user.password
  // }
  if(!req.user) res.redirect('/login')

  console.log("get")
  console.log(req.user)
  res.render('index.ejs', {'id' : req.user.email, 'password' : req.user.password})
})



// app.get("/:id", function(req, res) {
//   console.log("get param " + req.params)
//   res.send('Hello' + req.params.id + '!!')
// })

app.get('/main', function(req, res) {
  res.send('main')
})

app.get('/index', function(req, res) {
  console.log("index")
  console.log(req.user)
  res.render('index.ejs', {'id' : req.user.email, 'password' : req.user.password})
})



app.get('/login', function(req, res) {
  var msg
  var errMsg = req.flash('error')
  if(errMsg) msg = errMsg
  res.render('login.ejs', {message : msg})
})

passport.serializeUser(function(user, done) {
  console.log("serial")
  console.log(user)
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  console.log("deserial")
  console.log(user)
  done(null, user)
})

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  var id = "test"
  var pass = "test"
  if(id !== email) {

    return done(null, false, {message : "wrong id"})
  } else if (pass !== password) {

    return done(null, false, {message : "wrong pass"})
  }

  return done(null, {'email' : email, 'password' : password})
}
))

// app.post('/user/login', passport.authenticate('local-login', {
//   successRedirect : '/index',  // 성공했을시
//   failureRedirect : '/login',  // 실패했을시
//   failureFlash : true
// }))

app.post('/user/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    console.log("login post")
    console.log(user)
    console.log(req.user)
    if(err) res.json(err)
    if(!user) return res.json({message : 0 })
    else {
      req.logIn(user, function(err) {
        console.log(req.user)
        if(err) return next(err)
        return res.json(user)
      })
    }
  })(req, res, next)
})

app.get('/logout', function(req, res) {
  console.log("logout", req.user)
  req.logout()
  console.log("logout2", req.user)
  res.redirect('/')
})
