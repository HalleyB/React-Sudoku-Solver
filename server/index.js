const express = require('express');
const path = require('path');
const db = require('../db/client.js');

const app = express();
app.use(express.static(path.join(__dirname, "../client")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.post('/sudoku', (req, res) => {
  let data = req.body
  let formatedData = {
    rowOne: data[0],
    rowTwo: data[1],
    rowThree: data[2],
    rowFour: data[3],
    rowFive: data[4],
    rowSix: data[5],
    rowSeven: data[6],
    rowEight: data[7],
    rowNine: data[8]
  }
  db.save(formatedData)
  .then(data => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(500);
  })
})

app.get('/sudoku', (req, res) => {
  db.get()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '!');
})