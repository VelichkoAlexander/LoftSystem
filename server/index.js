require('dotenv').config()
const http = require('http');
const express =  require('./express');
const server = http.createServer(express);
const PORT = process.env.PORT || 3000;
console.log(process.env.DB_HOST_URL)
require('./socket')(server);
require('./models/connect');

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));