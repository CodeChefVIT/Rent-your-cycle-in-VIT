const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
  modelName: { type: String, required: true },
  company: { type: String, required: true },
  owner: { type: String, required: true },
  imageUrl: { type: String, required: true, default:"shorturl.at/bginQ" },
  bookstatus: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Bike", bikeSchema);
