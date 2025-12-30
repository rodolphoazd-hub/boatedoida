const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SAVE_FILE = './data/save.json';

app.use(cors());
app.use(express.json());

// Carregar progresso
app.get('/progresso/:nome', (req, res) => {
    const nome = req.params.nome;
    const data = lerSave();
    const progresso = data[nome] || { fama: 0, missao: 0 };
    res.json(progresso);
});

// Salvar progresso
app.post('/progresso/:nome', (req, res) => {
    const nome = req.params.nome;
    const { fama, missao } = req.body;

    const data = lerSave();
    data[nome] = { fama, missao };
    fs.writeFileSync(SAVE_FILE, JSON.stringify(data, null, 2));
    res.json({ status: 'salvo' });
});

function lerSave() {
    if (!fs.existsSync(SAVE_FILE)) return {};
    return JSON.parse(fs.readFileSync(SAVE_FILE));
}

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
