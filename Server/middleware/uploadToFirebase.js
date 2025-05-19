/** @format */

const { bucket } = require("../utils/firebase.config");
const { v4: uuidv4 } = require("uuid");

const uploadImageToFirebase = async (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) return next();

    const uniqueId = uuidv4();
    const fileName = `banners/${Date.now()}-${uniqueId}-${
      req.file.originalname
    }`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uniqueId,
        },
      },
    });

    stream.on("error", (err) => {
      console.error("Firebase upload error:", err);
      return res.status(500).json({ message: "Image upload failed" });
    });

    stream.on("finish", () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(fileName)}?alt=media&token=${uniqueId}`;
      req.body.bannerImage = publicUrl;
      next();
    });

    stream.end(req.file.buffer);
  } catch (err) {
    console.error("Unexpected upload error:", err);
    res.status(500).json({ message: "Unexpected error during image upload" });
  }
};

module.exports = uploadImageToFirebase;
