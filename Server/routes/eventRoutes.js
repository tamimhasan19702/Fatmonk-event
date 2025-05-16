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

router.use(protect);

router.post(
  "/",
  upload.single("bannerImage"),
  eventValidation,
  eventController.createEvent
);

router.get("/", eventFilterValidation, eventController.getEvents);

router.get("/:id", eventIdValidation, eventController.getEventById);

router.put(
  "/:id",
  eventIdValidation,
  upload.single("bannerImage"),

  eventController.updateEvent
);

router.delete("/:id", eventIdValidation, eventController.deleteEvent);

module.exports = router;
