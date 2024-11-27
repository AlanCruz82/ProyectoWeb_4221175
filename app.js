const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();

//configuracion para el uso peticiones post
app.use(bodyParser.urlencoded({ extended: false }));

//configuracion de archivos estaticos
app.use(express.static('public'));

//platillas que sean dinamicas
app.set('view engine', 'ejs');

//crear la conexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // tu usuario de MySQL
    password: 'cuartosemestre', // tu contraseña de MySQL
    database: 'crud_node',
    port: 3306
});


//comprobacion de la conexion de la base de datos
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

//iniciamos el server

//const hostname= '192.168.3.115';
const port = 3009;
app.listen(port,()=>{
    console.log(`Servidor en funcionamiento desde http://localhost:${port}`);
});

//index
app.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.send('Error');
        } else {
            res.render('index', { users: results });
        }
    });
});

//Vista para agregar un nuevo registro
app.get('/agregar', (req,res)=>{
    res.render('agregar');
});

//agregar usuarios
app.post('/add', (req, res) => {
    const { nombre, apellidopat, apellidomat, edad, telefono, email, genero } = req.body;
    const query = 'INSERT INTO usuarios (nombre_uss, apellidopat_uss, apellidomat_uss, edad_uss, telefono_uss, email_uss, genero_uss) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, apellidopat, apellidomat, edad, telefono, email, genero], (err) => {
        if (err) {
            console.error('Error adding user:', err);
            res.send('Error');
        } else {
            res.redirect('/');
        }
    });
});

//editar usuario
app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM usuarios WHERE id_uss = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.send('Error');
        } else {
            res.render('edit', { user: results[0] });
        }
    });
});

//actualizar usuario
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellidopat, apellidomat, edad, telefono, email, genero } = req.body;
    const query = 'UPDATE usuarios SET nombre_uss=? , apellidopat_uss=?, apellidomat_uss=?, edad_uss=? , telefono_uss=? , email_uss=? , genero_uss=? WHERE id_uss = ?';
    db.query(query, [nombre, apellidopat, apellidomat, edad, telefono, email, genero, id], (err) => {
        if (err) {
            console.error('Error adding user:', err);
            res.send('Error');
        } else {
            res.redirect('/');
        }
    });
});

//eliminar usuario
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id_uss = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.send('Error');
        } else {
            res.redirect('/');
        }
    });
});