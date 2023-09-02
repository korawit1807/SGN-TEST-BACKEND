const app = require('./app');
const PORT = 3000
const { getMessage } = require('./socket')
const server = require('http').createServer(app);
const io = require('socket.io')
const { checkDBConnect  } = require('./connect')
const {
    covidCaseModel
} = require('./models')
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
        getMessage(client, count)
    }, 3000)
});

module.exports = server



