const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const service = require('./service')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({ origin: "*" }))
app.use(service);


module.exports = app