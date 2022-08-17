const express = require("express");

const { uploadBikeDetails, getAllBikes } = require("../controllers/bike-ctrl");
const { authUserValidation } = require("../helpers/auth-user-validation");
const { upload } = require("../helpers/image-export");

const router = express.Router();

router.post(
  "/uploadbikedata",
  authUserValidation,
  upload.single("image"),
  uploadBikeDetails
);

router.get("/getBikes", getAllBikes);

module.exports = router;
