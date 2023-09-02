const {covidCaseModel} = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')
module.exports = {
    getMessage: async(client, date, count) => {
        //const formatDate = moment(date).format("YYYY-MM-DD")
        const response = await covidCaseModel.findAll({
            where: {
                date: {
                    [Op.and]: {
                        [Op.gte]: date + ' 00:00:00',
                        [Op.lte]: date + ' 23:59:59.999999',
                    }
                }
            },
            limit: 30,
            order: [
                ['value', 'DESC']
            ]
        })
        // // const dataChart = [
        // //     {
        // //         id: 0,
        // //         title: 'Page A',
        // //         value: getRamdom(10, 100),
        // //         color: "#c8303b"
        // //     },
        // //     {
        // //         id: 1,
        // //         title: 'Page B',
        // //         value: getRamdom(10, 100),
        // //         color: "#2c2c2c"
        // //     },
        // //     {
        // //         id: 2,
        // //         title: 'Page C',
        // //         value: getRamdom(10, 100),
        // //         color: "#3fc42d"
        // //     }
        // // ]
        // // if(count === 3 ){
        // //     dataChart.push({
        // //         id: 3,
        // //         title: 'Page D',
        // //         value: getRamdom(10, 100),
        // //         color: "#3fc42d"
        // //     })
        // }
        client.emit("message", response)
    }
}

const getRamdom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}