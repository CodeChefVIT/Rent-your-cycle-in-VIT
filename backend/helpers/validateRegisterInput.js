const User = require("../model/user-model");

module.exports = async ({
  name,
  username,
  regno,
  password,
  confirmPassword,
  block,
  room_no,
  phone,
  wa_num,
}) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Name Must Not Be Empty";
  }
  if (username.trim() === "") {
    errors.username = "Username Must Not Be Empty";
  } else {
    const user = await User.findOne({ username: username });
    if (user) {
      errors.username =
        "Username Already Exists, Please Choose Another Username";
    }
  }
  if (regno.trim() === "") {
    errors.regno = "Registration Number Must Not Be Empty";
  }
  if (block.trim() === "") {
    errors.block = "Block Must Not Be Empty";
  }
  if (room_no.trim() === "") {
    errors.room_no = "Room Number Must Not Be Empty";
  }
  if (phone.trim() === "") {
    errors.phone = "Phone Number Must Not Be Empty";
  }
  if (wa_num.trim() === "") {
    errors.wa_num = "Whatsapp Number Must Not Be Empty";
  }
  if (password.trim() === "") {
    errors.password = "Password is Empty";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Password Mismatched";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
