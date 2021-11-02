const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CinemaSchema = new Schema({
  mainHall: [Number]
});

const Cinema = mongoose.model("Cinema", CinemaSchema);

module.exports = Cinema