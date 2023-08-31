const express = require('express')
const router = express.Router()
const covidGet = require('./get')
router.get('/get', (req, res) => {
    const getData = new covidGet()
    getData.get(req, res);
})

module.exports =  router