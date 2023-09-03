const axios = require('axios')
const {covidCaseModel} = require('../../models')
const moment = require('moment')
const { Op } = require('sequelize')
module.exports = class covidCheck {
    constructor() {
      this.request = axios.create({});
      this.url = process.env.COVID_URL
    }
    async check(req, res) {
        try {
            const { date } = req.query 
            const formatDate = moment(date).format("YYYY-MM-DD")
            const response = await covidCaseModel.findAll({
                where: {
                    date: {
                        [Op.and]: {
                            [Op.gte]: formatDate + ' 00:00:00',
                            [Op.lte]: formatDate + ' 23:59:59.999999',
                        }
                    }
                },
                limit: 30,
                order: [
                    ['value', 'DESC']
                ]
            })
            return res.json({ data: response })

        } catch (error) {
            console.error('[CHECK] covid error: ', error)
        }
    }
}