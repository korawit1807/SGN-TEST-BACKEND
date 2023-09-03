const {covidCaseModel} = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')
module.exports = {
    getMessage: async(client, date, count) => {
        const formatDate = moment(date).format("YYYY-MM-DD")
        const response = await covidCaseModel.findAll({
            where: {
                date: {
                    [Op.and]: {
                        [Op.gte]: formatDate + ' 00:00:00',
                        [Op.lte]: formatDate + ' 23:59:59.99',
                    }
                }
            },
            limit: 30,
            order: [
                ['value', 'DESC']
            ]
        })
        if(response){
            client.emit("message", response)
        }else{
            client.emit("message", [])
        }
        
    }
}