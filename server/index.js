const express = require('express');
const path = require('path');
const db = require('../db/client.js');

const app = express();
app.use(express.static(path.join(__dirname, "../client")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '!');
})