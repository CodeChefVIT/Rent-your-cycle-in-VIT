const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cycleSchema = new Schema({
  modelname: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("CycleModel", cycleSchema);
