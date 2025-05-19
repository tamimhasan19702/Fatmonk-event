/** @format */

// uploadImageToFirebase.js
const { bucket } = require("../utils/firebase.config");
const { v4: uuidv4 } = require("uuid");

const uploadImageToFirebase = async (req, res, next) => {
  try {
    if (!req.file) {
      console.warn("No file attached in request");
      return next();
    }

    if (!req.file.buffer || req.file.buffer.length === 0) {
      console.error("Empty file buffer");
      return next(new Error("Empty file buffer. Upload failed."));
    }

    const filename = `banners/${uuidv4()}-${req.file.originalname}`;
    const blob = bucket.file(filename);
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
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(blob.name)}?alt=media`;
      req.body.bannerImage = publicUrl;
      console.log("Upload successful:", publicUrl);
      next();
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Unexpected error during upload:", error);
    next(error);
  }
};

module.exports = uploadImageToFirebase;
