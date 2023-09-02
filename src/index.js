const app = require('./app');
const PORT = 3000
const { getMessage } = require('./socket')
const server = require('http').createServer(app);
const io = require('socket.io')
const { checkDBConnect  } = require('./connect')
const {
    covidCaseModel
} = require('./models')
const moment = require('moment')
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    checkDBConnect().then(()=> {
        // -- init model -- //
        covidCaseModel
        // -- End init model -- //
    })
});
const socket = new io.Server(server, {cors: {
    origin: "*", 
}})
let count = 0
socket.on('connection', (client) => {
    count++
    console.log('user connect', count)
    if(count === 4) count = 0
    
    setInterval(()=>{
        let date = new Date("2022-06-30")
    //console.log(date)
        let new_date = moment(date).add(1, 'days').format("YYYY-MM-DD");
        //console.log(new_date)
        getMessage(client, new_date,count)
    }, 3000)
});

module.exports = server



