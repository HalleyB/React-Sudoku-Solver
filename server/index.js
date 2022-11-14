const express = require('express');
const db = require('../db/client.js');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log('Listening on port ', PORT, '!');
})