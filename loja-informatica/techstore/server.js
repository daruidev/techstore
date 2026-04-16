// Importação dos módulos necessários
const express = require('express');
const fs = require('fs');
const url = require('url');

// Inicialização do aplicativo Express
const app = express();
const PORT = 3000;

// Configuração para servir arquivos estáticos (CSS, imagens, etc.)
app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/images', express.static(__dirname + '/public/images'));

// Alternativa mais simples (serve a pasta pública inteira)
// app.use('/public', express.static(__dirname + '/public'));

// Middleware para logging das requisições
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rota principal - Página inicial
app.get('/', (req, res) => {
    fs.readFile(__dirname + '/src/pages/index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo index.html:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.status(200).send(data);
    });
});

// Rota para o Produto A (Notebook Gamer)
app.get('/notebook-gamer', (req, res) => {
    fs.readFile(__dirname + '/src/pages/produtoA.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo produtoA.html:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.status(200).send(data);
    });
});

// Rota para o Produto B (Monitor Ultrawide)
app.get('/monitor-ultrawide', (req, res) => {
    fs.readFile(__dirname + '/src/pages/produtoB.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo produtoB.html:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        res.status(200).send(data);
    });
});

// Rota para tratar URLs não encontradas (404)
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Página não encontrada - TechStore</title>
            <link rel="stylesheet" href="/public/css/style.css">
        </head>
        <body>
            <nav class="navbar">
                <div class="container">
                    <h1>TechStore</h1>
                    <ul class="nav-links">
                        <li><a href="/">Início</a></li>
                        <li><a href="/notebook-gamer">Notebook Gamer</a></li>
                        <li><a href="/monitor-ultrawide">Monitor Ultrawide</a></li>
                    </ul>
                </div>
            </nav>
            <div class="container">
                <div class="error-page">
                    <h2>Erro 404 - Página não encontrada</h2>
                    <p>A página que você está procurando não existe.</p>
                    <a href="/" class="btn">Voltar para a página inicial</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Rotas disponíveis:`);
    console.log(`  - http://localhost:${PORT}/`);
    console.log(`  - http://localhost:${PORT}/notebook-gamer`);
    console.log(`  - http://localhost:${PORT}/monitor-ultrawide`);
});