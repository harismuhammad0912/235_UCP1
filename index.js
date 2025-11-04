const express = require ('express');
let mysql = require ('mysql2');
const app = express ();
const port = 3000;
app.use(express.json());
app.use (express.urlencoded({extended: true}));

app.get ('/', (req, res)=> {
    res.send('Hello World');
});



app.listen (port,() => {
    console.log(`Server is Running on port ${port}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'haris0912',
    database: 'hollywood',
    port:  3306
});

db.connect((err)=> {
    if (err){
        console.error('Error Connecting to MYSQL:' + err.stack);
        return;
    }
    console.log('Connection Succesfully');
});

//Membuat Method GET
app.get('/film', (req, res) => {
    let sql = "SELECT * FROM film";
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});


//Membuat Method POST
app.post('/film', (req, res) => {
    const { id, nama_film, tahun_terbit, deskripsi, sutradara,genre } = req.body;
    const sql = 'INSERT INTO film (id, nama_film, tahun_terbit, deskripsi, sutradara, genre) VALUES (?, ?, ?, ?, ?)';      
    db.query(sql, [id, nama_film, tahun_terbit, deskripsi, sutradara, genre], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).send('Error executing query');
        return;
      }
      res.status(201).json({ id: results.insertid, nama_film, tahun_terbit, deskripsi, sutradara, genre });
    });
});