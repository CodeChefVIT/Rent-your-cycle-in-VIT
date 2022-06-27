const express = require("express");
const { register, login, getuser } = require("../controllers/user-ctrl");
const { authUserValidation } = require("../helpers/auth-user-validation");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getuser", authUserValidation, getuser);

module.exports = router;
