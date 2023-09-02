const axios = require('axios')
const {covidCaseModel} = require('../../models')
module.exports = class covidCheck {
    constructor() {
      this.request = axios.create({});
      this.url = process.env.COVID_URL
    }
    async check(req, res) {
        try {
            const response = await covidCaseModel.findAll({
                limit: 20
            })
            return response

        } catch (error) {
            console.error('[CHECK] covid error: ', error)
        }
    }
}