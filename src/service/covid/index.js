const express = require('express')
const router = express.Router()
const covidGet = require('./get')
const covidCheck = require('./check')
router.get('/get', (req, res) => {
    const getData = new covidGet()
    getData.get(req, res);
})

router.get('/check', (req, res) => {
    const checkData = new covidCheck()
    checkData.check(req, res);
})

module.exports =  router