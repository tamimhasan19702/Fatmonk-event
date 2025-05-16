/** @format */

const Event = require("../models/Event");
const fs = require("fs");
const path = require("path");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, time, location } = req.body;
    const bannerImage = req.file ? req.file.path : "";

    if (!name || !date || !time || !location) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const event = await Event.create({
      user: req.user._id,
      name,
      description,
      date,
      time,
      location,
      bannerImage,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Events with filtering, pagination, sorting
exports.getEvents = async (req, res) => {
  try {
    const {
      date,
      location,
      upcomingOnly,
      sort = "asc",
      page = 1,
      limit = 10,
    } = req.query;
    const query = {};

    if (date) query.date = new Date(date);
    if (upcomingOnly === "true")
      query.date = { ...query.date, $gte: new Date() };
    if (location) query.location = { $regex: location, $options: "i" };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOption = sort === "desc" ? -1 : 1;

    const events = await Event.find(query)
      .sort({ date: sortOption })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { eventName, description, date, time, location } = req.body;

    if (eventName !== undefined) event.eventName = eventName;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;
    if (time !== undefined) event.time = time;
    if (location !== undefined) event.location = location;

    // If a new banner image is uploaded, replace the old one
    if (req.file) {
      if (event.bannerImage) {
        const oldImagePath = path.join(__dirname, "..", event.bannerImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
      event.bannerImage = req.file.path;
    }

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if current user owns the event
    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete uploaded banner image if exists
    if (event.bannerImage) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        event.bannerImage
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the event from database
    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
