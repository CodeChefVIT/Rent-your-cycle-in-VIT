const BikeModel = require("../model/bike-model");
const { bucket } = require("../helpers/cloud-storage");


uploadBikeDetails = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        error: "Could Not Upload File, No File Specified",
      });
    }
    console.log("1")
    const blob = bucket.file(req.file.originalname);
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    let publicUrl = "shorturl.at/bginQ";
    blobWriter.on("error", (err) => next(err));
    blobWriter.on("finish", () => {
      publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
    });
    console.log("2")
    blobWriter.end(req.file.buffer);
    const newBike = new BikeModel({
      modelName: req.body.modelName,
      company: req.body.company,
      owner: req.body.owner,
      imageUrl: publicUrl,
    });
    const result = await newBike.save();
    if (!result) {
      return res.status(400).send({
        success: false,
        error: "Some Error",
      });
    }
    return res.status(200).send({
      success:true,
      message:"Bike Data Added Successfully"
    })
  } catch (err) {
    return res.status(400).send({
      success: false,
      error: err,
    });
  }
};

getAllBikes = async (req, res) => {
  const bikes = await BikeModel.find();
  return res.status(200).json({
    success: true,
    data: bikes,
  });
};

module.exports = { uploadBikeDetails, getAllBikes };
