const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketHolderSchema = new Schema({
  users: [{username: String, age: Number}],
  age: Number,
  seats: [Number]
});

const TicketHolder = mongoose.model("User", TicketHolderSchema);

module.exports = TicketHolder