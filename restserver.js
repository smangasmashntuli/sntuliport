const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'S!mangalis0',
    database: 'restuarants'
});

connection.connect(err => {
    if(err){
        console.error('Database connection not started', err);
        return;
    }
    console.log('Connected to database');
});

app.post('/order', (req, res) => {
    const {title, price, description} = req.body;
    const sql = 'INSERT INTO products (title, price, description) VALUES (?,?,?)';
    connection.query(sql, [title, price, description], (err, result) => {
        if(err){
            console.error('Insert error:', err);
            return res.status(500).send('Database error');
        }
        res.send('Data Saved');
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});