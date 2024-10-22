const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdvisight'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

app.get('/dados-frutas', (req, res) => {
    const query = "SELECT nome_alimento, peso_bruto FROM info_alimentos WHERE nome_alimento IN ('Banana', 'Maçã')";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados no banco de dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }

        res.status(200).json(results);
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}/dados-frutas para ver a aplicação.`);
});
