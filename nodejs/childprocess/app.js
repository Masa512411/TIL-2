var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', 'ejs')

app.listen(9000, function() {
  console.log('Server Start Port 4000')
})

app.use('/', router)
