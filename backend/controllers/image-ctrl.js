const ImageModel = require("../model/cycle-model");
const { bucket } = require("../helpers/cloud-storage");

uploadCycleDetails = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        error: "Could Not Upload File, No File Specified",
      });
    }
    const blob = bucket.file(req.file.originalname);
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobWriter.on("error", (err) => next(err));
    blobWriter.on("finish", () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
      res.status(200).send({
        success: true,
        fileName: req.file.originalname,
        fileLocation: publicUrl,
      });
    });
    blobWriter.end(req.file.buffer)
  } catch (err) {
    return res.status(400).send({
      success: false,
      error: err,
    });
  }
};

module.exports = { uploadCycleDetails };
