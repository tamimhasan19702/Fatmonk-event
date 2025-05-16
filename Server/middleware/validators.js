/** @format */
/** @format */

const { body, param, query, validationResult } = require("express-validator");

// Helper to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Auth
exports.registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validate,
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

// Events
exports.eventValidation = [
  body("name").notEmpty().withMessage("Event name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("location").notEmpty().withMessage("Location is required"),
  validate,
];

exports.eventIdValidation = [
  param("id").isMongoId().withMessage("Invalid event ID"),
  validate,
];

exports.eventFilterValidation = [
  query("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in ISO format"),
  query("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),
  validate,
];
