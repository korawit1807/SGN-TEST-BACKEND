const express = require('express')
const router = express.Router()
const moment = require('moment')
const covid = require('./covid')

router.use((req, res, next) => { 
    console.log(`DATE TIME: ${moment().format('YYYY-MM-DD h:mm:ss a')}, URL: ${req.originalUrl}`)
    next()
})

router.use('/covid', covid)

module.exports = router
