var express = require('express')
var router = express.Router()
var path = require('path')

var spawn = require('child_process').spawn
var node = spawn('node', [path.join(__dirname, '../../node/temp.js')])

node.stdout.on('data', (data) => {
  console.log("stdout: ", data.toString())
})

node.stderr.on('data', (data) => {
  conosle.log("stderr: ", data)
})

node.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})

module.exports = router
