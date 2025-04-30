import mysql from 'mysql2';

//conection to database
const db = mysql.createConnection({
    user: `${process.env.SQL_USER}`,
    password: `${process.env.SQL_PASSWORD}`,
    host: `${process.env.SQL_URL}`,
    database: `${process.env.SQL_DATABASE}`,
});

export default db;