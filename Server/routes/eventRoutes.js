/** @format */

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const protect = require("../middleware/authMiddleware");
const upload = require("../utils/upload");
const {
  eventValidation,
  eventIdValidation,
  eventFilterValidation,
} = require("../middleware/validators");
const uploadImageToFirebase = require("../middleware/uploadToFirebase");

router.use(protect);

router.post(
  "/",
  upload.single("bannerImage"),
  uploadImageToFirebase,
  eventValidation,
  eventController.createEvent
);

router.get("/", eventFilterValidation, eventController.getEvents);

router.get("/:id", eventIdValidation, eventController.getEventById);

router.put(
  "/:id",
  eventIdValidation,
  upload.single("bannerImage"),
  uploadImageToFirebase,

  eventController.updateEvent
);

router.delete("/:id", eventIdValidation, eventController.deleteEvent);

module.exports = router;
