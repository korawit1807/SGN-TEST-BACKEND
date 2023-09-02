const app = require('./app');
const PORT = 4000
const { getMessage } = require('./socket')
const server = require('http').createServer(app);
const io = require('socket.io')
const { checkDBConnect  } = require('./connect')
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    checkDBConnect()
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

const getRamdom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = server



