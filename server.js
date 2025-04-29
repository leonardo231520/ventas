const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ventas_db'
});

connection.connect(err => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.use(express.static(__dirname));

app.post('/registrar', (req, res) => {
    const { producto, cantidad, precio } = req.body;

    const query = 'INSERT INTO ventas (producto, cantidad, precio) VALUES (?, ?, ?)';
    connection.query(query, [producto, cantidad, precio], (err, results) => {
        if (err) {
            console.error('Error al insertar venta:', err);
            res.status(500).json({ message: 'Error al registrar venta' });
            return;
        }
        res.json({ message: 'Venta registrada exitosamente' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener todas las ventas
app.get('/ventas', (req, res) => {
    connection.query('SELECT * FROM ventas', (err, results) => {
        if (err) {
            console.error('Error al obtener ventas:', err);
            res.status(500).json({ message: 'Error al obtener ventas' });
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
