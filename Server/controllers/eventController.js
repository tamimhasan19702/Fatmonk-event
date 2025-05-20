/** @format */

const Event = require("../models/Event");
const fs = require("fs");
const path = require("path");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, time, location, bannerImage } = req.body;

    const newEvent = new Event({
      user: req.user._id,
      name,
      description,
      date,
      time,
      location,
      bannerImage,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
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

    // Date filtering
    if (date) {
      const parsedDate = new Date(date);
      const startOfDay = new Date(parsedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(parsedDate);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (upcomingOnly === "true") {
      const now = new Date();

      if (query.date) {
        query.date.$gte = now > query.date.$gte ? now : query.date.$gte;
      } else {
        query.date = { $gte: now };
      }
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

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

    const { name, description, date, time, location, bannerImage } = req.body;

    if (name) event.name = name;
    if (description !== undefined) event.description = description;
    if (date) event.date = date;
    if (time) event.time = time;
    if (location) event.location = location;
    if (bannerImage) {
      event.bannerImage = bannerImage;
    }

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Event\
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
