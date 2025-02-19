const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use("/api", routes);

app.get('/',(req, res) => {
    res.json({ message: 'Welcome to BinBuddy APIs, please register to access our APIs' });
});


module.exports = app;