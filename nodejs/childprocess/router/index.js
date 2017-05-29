var express = require('express')
var router = express.Router()
var child = require('./child/child')
var input = require('./input/input')

router.use('/child', child)
router.use('/input', input)

module.exports = router
