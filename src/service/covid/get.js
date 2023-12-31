const axios = require('axios')
const moment = require('moment')
const qs = require('qs')
require('dotenv').config()
const ramdomColor = require('randomcolor');
const {covidCaseModel} = require('../../models')
module.exports = class covidGet {
    constructor() {
      this.request = axios.create({});
      this.url = process.env.COVID_URL
      this.key = process.env.key
    }
    async get(req, res) {
      try {
        const lastDay = req.query?.range ?? 'all'
        const options = {
          method: "GET",
          url: `${this.url}?${qs.stringify({lastdays: lastDay})}`
        }
        const response = await this.request(options)
        const { data } = response
        if( data?.length <= 0 ){
          return res.status(404).json({err: "GET Covid Data Not Found!"})
        }
        for(let i = 0; i < data.length; i++ ){
          const createData = {
            title: data[i]?.country,
            province: data[i]?.province,
            color: ramdomColor()
          }
          let listOfkey = Object.entries(data[i]?.timeline.cases)
          let setNewData = []
          if(listOfkey){
            listOfkey.map((pData) => {
              let onlyDate = pData[0].toString()
              const pattern = /^4\/[0-9]{1,2}\/20$/gim
              if(pattern.test(onlyDate)){
                let newDate = new Date(onlyDate)
                const test = {
                  title: createData.title,
                  province: createData.province,
                  value: Number(pData[1]),
                  color: createData.color
                }
                newDate = moment(newDate).format("YYYY-MM-DD")
                test.date = newDate
                setNewData.push(test)
              }
            })
          }
          console.log(setNewData)
          await covidCaseModel.bulkCreate(setNewData)
        }

        return res.json({ data: response?.data })

      } catch (error) {
        console.error('[GET] covid error: ', error)
      }
      
    }
  }

// -- Exp incoming data -- //
// {
//   "country": "Afghanistan",
//   "province": null,
//   "timeline": {
//       "cases": {
//           "12/10/22": 206543,
//           "12/11/22": 206603,
//           "12/12/22": 206702,
//           "12/13/22": 206743,
//           "12/14/22": 206788,
//           "12/15/22": 206879,
//           "12/16/22": 206912,
//           "12/17/22": 206943,
//           "12/18/22": 207037,
//           "12/19/22": 207084,
//           "12/20/22": 207146,
//           "12/21/22": 207190,
//           "12/22/22": 207239,
//           "12/23/22": 207262,
//           "12/24/22": 207310,
//           "12/25/22": 207399,
//           "12/26/22": 207438,
//           "12/27/22": 207460,
//           "12/28/22": 207493,
//           "12/29/22": 207511,
//           "12/30/22": 207550,
//           "12/31/22": 207559,
//           "1/1/23": 207616,
//           "1/2/23": 207627,
//           "1/3/23": 207654,
//           "1/4/23": 207715,
//           "1/5/23": 207748,
//           "1/6/23": 207766,
//           "1/7/23": 207766,
//           "1/8/23": 207819,
//           "1/9/23": 207841,
//           "1/10/23": 207866,
//           "1/11/23": 207900,
//           "1/12/23": 207900,
//           "1/13/23": 207900,
//           "1/14/23": 207900,
//           "1/15/23": 207900,
//           "1/16/23": 207993,
//           "1/17/23": 208009,
//           "1/18/23": 208034,
//           "1/19/23": 208062,
//           "1/20/23": 208084,
//           "1/21/23": 208084,
//           "1/22/23": 208084,
//           "1/23/23": 208097,
//           "1/24/23": 208289,
//           "1/25/23": 208324,
//           "1/26/23": 208324,
//           "1/27/23": 208432,
//           "1/28/23": 208435,
//           "1/29/23": 208435,
//           "1/30/23": 208502,
//           "1/31/23": 208545,
//           "2/1/23": 208552,
//           "2/2/23": 208669,
//           "2/3/23": 208669,
//           "2/4/23": 208621,
//           "2/5/23": 208627,
//           "2/6/23": 208704,
//           "2/7/23": 208721,
//           "2/8/23": 208771,
//           "2/9/23": 208771,
//           "2/10/23": 208943,
//           "2/11/23": 208971,
//           "2/12/23": 208982,
//           "2/13/23": 209011,
//           "2/14/23": 209036,
//           "2/15/23": 209056,
//           "2/16/23": 209072,
//           "2/17/23": 209083,
//           "2/18/23": 209084,
//           "2/19/23": 209107,
//           "2/20/23": 209153,
//           "2/21/23": 209181,
//           "2/22/23": 209181,
//           "2/23/23": 209215,
//           "2/24/23": 209230,
//           "2/25/23": 209246,
//           "2/26/23": 209274,
//           "2/27/23": 209308,
//           "2/28/23": 209322,
//           "3/1/23": 209340,
//           "3/2/23": 209358,
//           "3/3/23": 209362,
//           "3/4/23": 209369,
//           "3/5/23": 209390,
//           "3/6/23": 209406,
//           "3/7/23": 209436,
//           "3/8/23": 209451,
//           "3/9/23": 209451
//       },
//       "deaths": {
//           "12/10/22": 7839,
//           "12/11/22": 7839,
//           "12/12/22": 7840,
//           "12/13/22": 7843,
//           "12/14/22": 7843,
//           "12/15/22": 7843,
//           "12/16/22": 7843,
//           "12/17/22": 7844,
//           "12/18/22": 7845,
//           "12/19/22": 7845,
//           "12/20/22": 7845,
//           "12/21/22": 7845,
//           "12/22/22": 7845,
//           "12/23/22": 7845,
//           "12/24/22": 7845,
//           "12/25/22": 7846,
//           "12/26/22": 7846,
//           "12/27/22": 7846,
//           "12/28/22": 7846,
//           "12/29/22": 7847,
//           "12/30/22": 7847,
//           "12/31/22": 7849,
//           "1/1/23": 7849,
//           "1/2/23": 7849,
//           "1/3/23": 7850,
//           "1/4/23": 7850,
//           "1/5/23": 7850,
//           "1/6/23": 7850,
//           "1/7/23": 7850,
//           "1/8/23": 7853,
//           "1/9/23": 7854,
//           "1/10/23": 7854,
//           "1/11/23": 7854,
//           "1/12/23": 7854,
//           "1/13/23": 7854,
//           "1/14/23": 7854,
//           "1/15/23": 7854,
//           "1/16/23": 7857,
//           "1/17/23": 7859,
//           "1/18/23": 7860,
//           "1/19/23": 7864,
//           "1/20/23": 7864,
//           "1/21/23": 7864,
//           "1/22/23": 7864,
//           "1/23/23": 7870,
//           "1/24/23": 7871,
//           "1/25/23": 7872,
//           "1/26/23": 7872,
//           "1/27/23": 7875,
//           "1/28/23": 7876,
//           "1/29/23": 7876,
//           "1/30/23": 7879,
//           "1/31/23": 7882,
//           "2/1/23": 7882,
//           "2/2/23": 7891,
//           "2/3/23": 7891,
//           "2/4/23": 7894,
//           "2/5/23": 7896,
//           "2/6/23": 7896,
//           "2/7/23": 7896,
//           "2/8/23": 7896,
//           "2/9/23": 7896,
//           "2/10/23": 7896,
//           "2/11/23": 7896,
//           "2/12/23": 7896,
//           "2/13/23": 7896,
//           "2/14/23": 7896,
//           "2/15/23": 7896,
//           "2/16/23": 7896,
//           "2/17/23": 7896,
//           "2/18/23": 7896,
//           "2/19/23": 7896,
//           "2/20/23": 7896,
//           "2/21/23": 7896,
//           "2/22/23": 7896,
//           "2/23/23": 7896,
//           "2/24/23": 7896,
//           "2/25/23": 7896,
//           "2/26/23": 7896,
//           "2/27/23": 7896,
//           "2/28/23": 7896,
//           "3/1/23": 7896,
//           "3/2/23": 7896,
//           "3/3/23": 7896,
//           "3/4/23": 7896,
//           "3/5/23": 7896,
//           "3/6/23": 7896,
//           "3/7/23": 7896,
//           "3/8/23": 7896,
//           "3/9/23": 7896
//       },
//       "recovered": {
//           "12/10/22": 0,
//           "12/11/22": 0,
//           "12/12/22": 0,
//           "12/13/22": 0,
//           "12/14/22": 0,
//           "12/15/22": 0,
//           "12/16/22": 0,
//           "12/17/22": 0,
//           "12/18/22": 0,
//           "12/19/22": 0,
//           "12/20/22": 0,
//           "12/21/22": 0,
//           "12/22/22": 0,
//           "12/23/22": 0,
//           "12/24/22": 0,
//           "12/25/22": 0,
//           "12/26/22": 0,
//           "12/27/22": 0,
//           "12/28/22": 0,
//           "12/29/22": 0,
//           "12/30/22": 0,
//           "12/31/22": 0,
//           "1/1/23": 0,
//           "1/2/23": 0,
//           "1/3/23": 0,
//           "1/4/23": 0,
//           "1/5/23": 0,
//           "1/6/23": 0,
//           "1/7/23": 0,
//           "1/8/23": 0,
//           "1/9/23": 0,
//           "1/10/23": 0,
//           "1/11/23": 0,
//           "1/12/23": 0,
//           "1/13/23": 0,
//           "1/14/23": 0,
//           "1/15/23": 0,
//           "1/16/23": 0,
//           "1/17/23": 0,
//           "1/18/23": 0,
//           "1/19/23": 0,
//           "1/20/23": 0,
//           "1/21/23": 0,
//           "1/22/23": 0,
//           "1/23/23": 0,
//           "1/24/23": 0,
//           "1/25/23": 0,
//           "1/26/23": 0,
//           "1/27/23": 0,
//           "1/28/23": 0,
//           "1/29/23": 0,
//           "1/30/23": 0,
//           "1/31/23": 0,
//           "2/1/23": 0,
//           "2/2/23": 0,
//           "2/3/23": 0,
//           "2/4/23": 0,
//           "2/5/23": 0,
//           "2/6/23": 0,
//           "2/7/23": 0,
//           "2/8/23": 0,
//           "2/9/23": 0,
//           "2/10/23": 0,
//           "2/11/23": 0,
//           "2/12/23": 0,
//           "2/13/23": 0,
//           "2/14/23": 0,
//           "2/15/23": 0,
//           "2/16/23": 0,
//           "2/17/23": 0,
//           "2/18/23": 0,
//           "2/19/23": 0,
//           "2/20/23": 0,
//           "2/21/23": 0,
//           "2/22/23": 0,
//           "2/23/23": 0,
//           "2/24/23": 0,
//           "2/25/23": 0,
//           "2/26/23": 0,
//           "2/27/23": 0,
//           "2/28/23": 0,
//           "3/1/23": 0,
//           "3/2/23": 0,
//           "3/3/23": 0,
//           "3/4/23": 0,
//           "3/5/23": 0,
//           "3/6/23": 0,
//           "3/7/23": 0,
//           "3/8/23": 0,
//           "3/9/23": 0
//       }
//   }
// },
// -- End Example incoming data -- //