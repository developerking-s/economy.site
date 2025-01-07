const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const PORT = 3000;

const DISCORD_CLIENT_ID = '893979282781659166';
const DISCORD_CLIENT_SECRET = '24198537a4c5a3e4864c84fc24e1607906b8b4e17e3bbbae510de84f9435a774';
const REDIRECT_URI = 'https://economy-gg.onrender.com/';

app.get('/login/discord', (req, res) => {
    const redirect_uri = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`;
    res.redirect(redirect_uri);
});

aID da aplicação: 893979282781659166pp.get('/auth/discord', async (req, res) => {
    const { code } = req.query;

    const tokenRequestData = {
        client_id: 893979282781659166,
        client_secret: 24198537a4c5a3e4864c84fc24e1607906b8b4e17e3bbbae510de84f9435a774,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: https://economy-gg.onrender.com/,
        scope: 'identify',
    };

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', querystring.stringify(tokenRequestData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token } = tokenResponse.data;

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const user = userResponse.data;
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao autenticar com o Discord' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
