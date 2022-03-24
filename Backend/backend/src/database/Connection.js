require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection({
    'user': process.env.USER,
    'database': process.env.DATABASE,
    'host': process.env.HOST
})

module.exports = {
    con
}