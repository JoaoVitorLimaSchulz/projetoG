const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json()); 

  app.get('/laboratorios', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM laboratorios');
      res.json(rows);
    } catch (error) {
      console.error('Erro ao buscar laboratorios:', error);
      res.status(500).send('Erro interno do servidor ao buscar tarefas.');
    }
  });

app.post('/laboratorios', async (req, res) => {
    const { nome, localizacao, informacoes} = req.body;
    const foto = req.file ? req.file.buffer : null;

    db.query(
        "INSERT INTO laboratorios (nome, localizacao, informacoes, foto) VALUES (?, ?, ?, ?)",
        [nome, localizacao, informacoes, foto],
        (err, result) => {
            if(err)ReadableStreamDefaultController.stauts(500).send(err);
            res.json({ message: "Cadastrado com sucesso!"});
        }
    );
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});