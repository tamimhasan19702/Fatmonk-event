/** @format */

// uploadImageToFirebase.js
const { bucket } = require("../utils/firebase.config");
const { v4: uuidv4 } = require("uuid");

const uploadImageToFirebase = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const blob = bucket.file(`banners/${uuidv4()}-${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.error("Upload error:", err);
      next(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      req.body.bannerImage = publicUrl;
      next();
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

module.exports = uploadImageToFirebase;
