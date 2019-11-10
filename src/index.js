const express = require('express');
const bodyParse = require('body-parser');

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:false}));

require('./app/controllers/index')(app);

app.listen(3000);