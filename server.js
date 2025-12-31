const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SAVE_FILE = './data/save.json';

app.use(cors());
app.use(express.json());

const MUSIC_FILE = './data/musicas.json';
const SHOP_FILE = './data/loja.json';

// Carregar progresso
app.get('/progresso/:nome', (req, res) => {
    const nome = req.params.nome;
    const data = lerFile(SAVE_FILE);
    const progresso = data[nome] || { fama: 0, chapter: 0, dinheiro: 100 };
    res.json(progresso);
});

// Salvar progresso
app.post('/progresso/:nome', (req, res) => {
    const nome = req.params.nome;
    const { fama, chapter, dinheiro } = req.body;

    const data = lerFile(SAVE_FILE);
    data[nome] = { fama, chapter, dinheiro };
    fs.writeFileSync(SAVE_FILE, JSON.stringify(data, null, 2));
    res.json({ status: 'salvo' });
});

// Listar músicas
app.get('/musicas', (req, res) => {
    res.json(lerFile(MUSIC_FILE, []));
});

// Listar itens da loja
app.get('/loja/itens', (req, res) => {
    res.json(lerFile(SHOP_FILE, []));
});

function lerFile(path, defaultVal = {}) {
    if (!fs.existsSync(path)) return defaultVal;
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (e) {
        return defaultVal;
    }
}

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
