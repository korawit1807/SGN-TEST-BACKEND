const express = require('express')
const router = express.Router()
const moment = require('moment')
const covid = require('./covid')
require('dotenv').config()
router.use((req, res, next) => {
    let { authorization } = req.headers
    if(authorization){
        authorization = authorization.split(" ")[1]
    }
    if (authorization != process.env.key) {
        return res.status(401).json({err: "unauthorized"})
    }
    console.log(`DATE TIME: ${moment().format('YYYY-MM-DD h:mm:ss a')}, URL: ${req.originalUrl}`)
    next()
})

router.use('/covid', covid)

module.exports = router
