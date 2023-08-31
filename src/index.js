const app = require('./app');
const PORT = 4000
const server = require('http').createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server



