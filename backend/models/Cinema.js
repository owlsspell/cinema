const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CinemaSchema = new Schema({
  date: String,
  mainHall: [Number]
});

const Cinema = mongoose.model("Cinema", CinemaSchema);

module.exports = Cinema