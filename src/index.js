const app = require('./app');
const PORT = 3000
const { getMessage, getMessageTEST } = require('./socket')
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
        //covidCaseModel
        // -- End init model -- //
    })
});
const socket = new io.Server(server, {cors: {
    origin: "*", 
}})
let count = 0
socket.on('connection', (client) => {
    count++
    //console.log('user connect', count)
    client.on("getDate", (date)=>{
        console.log(date)
        getMessage(client, date)
        //getMessageTEST(client, count)
    })
});



module.exports = server



