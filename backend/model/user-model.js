const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  regno: { type: String, required: true },
  password: { type: String, required: true },
  block: { type: String, required: true },
  room_no: { type: String, required: true },
  phone: { type: String, required: true },
  wa_num: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
