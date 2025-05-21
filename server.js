const mysql = require('mysql2');
const express = require ('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',  // Database host
    user: 'root', // Database user
    password: 'S!mangalis0',
    database: 'logindata' // Database name
});

connection.connect(err => {
    if(err){
        console.error('Database connection not started', err);
        return;
    }
    console.log('Connected to database');
});

app.post('/submit', (req, res) => {
    const {name, email, feedback} = req.body;
    const sql = 'INSERT INTO user_details (username, email, feedback) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, feedback], (err, result) => {
        if (err){
            console.error('Insert error:', err);
            return res.status(500).send('Database error');
        }
        res.send('Data saved');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});