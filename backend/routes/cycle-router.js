const express = require("express")

const {uploadCycleDetails} = require("../controllers/image-ctrl")
const {authUserValidation} = require("../helpers/auth-user-validation");
const {upload}=require("../helpers/image-export");

const router = express.Router();

router.post("/uploadcycledata",upload.single("image"),uploadCycleDetails)

module.exports = router;