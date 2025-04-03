import mysql from 'mysql2';

//conection to database
const db = mysql.createConnection({
    user: 'root',
    password: '', // replace with your password
    host: 'localhost',
    database: 'bibliogames',
});

export default db;