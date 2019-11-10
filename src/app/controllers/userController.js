const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/user');


const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const usuarios = await User.find().populate(['user']);
    
        return res.send({ usuarios });
      } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar usuarios' });
      }
});

module.exports = app => app.use('/usuarios', router)