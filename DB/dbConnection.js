// const {Client} = require ('pg');

// const client = new Client();

// client.connect().query().end()

const {Pool} = require('pg');

const pool = new Pool()

module.exports = pool