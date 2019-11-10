const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign( params, 
        authConfig.secret, { 
        expiresIn: 1800,
    });
}

//Rota de Registro
router.post('/registrar', async (req, res) => {

    const { email } = req.body;
    try {
        //Verifica se o usuário é único.
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já existe' });

        const user = await User.create(req.body);
        //Ocultar senha do usuário, mesmo que criptografada.
        user.senha = undefined;

        return res.send({ 
            user,
            token: generateToken({id: user.id})
         });

    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou.' });
    }
});

//Rota de Autehnticação
router.post('/autenticar', async (req, res) => {
    const { email, senha } = req.body;

    const user = await User.findOne({ email }).select('+senha');

    //Verifica se usuário existe
    if (!user)
        return res.status(400).send({ error: 'Usuário não existe!' });

    //Verifica se asenha está correta
    if (!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({ error: 'Senha inválida!' });

    //Ocultar senha do usuário, mesmo que criptografada.
    user.senha = undefined;

    return res.send({ 
        user, 
        token: generateToken({id: user.id })
     });
});

module.exports = app => app.use('/auth', router);