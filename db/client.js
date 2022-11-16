const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_URL;

mongoose.connect(connectionString)
.then(() => {
  console.log('Database connected!');
})
.catch((err) => {
  console.log('Error connecting to database: ', err);
})

const sudokuSchema = new mongoose.Schema({
  rowOne: [Number],
  rowTwo: [Number],
  rowThree: [Number],
  rowFour: [Number],
  rowFive: [Number],
  rowSix: [Number],
  rowSeven: [Number],
  rowEight: [Number],
  rowNine: [Number],
})

const Sudoku = mongoose.model('Sudoku', sudokuSchema);

const save = (data) => {
  let newBoard = new Sudoku(data);
  return newBoard.save();
}

const get = () => {
  return Sudoku.find({});
}

module.exports = {
  save,
  get
}