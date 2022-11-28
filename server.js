const express = require('express')
const server = express();

const port = process.env.PORT || 4000;



server.listen(port, () => console.log(`Connected to port ${port}`))