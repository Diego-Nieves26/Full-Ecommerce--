const { body, validationResult } = require("express-validator");

//Utils
const { AppError } = require("../utils/appError.util");

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((err) => err.msg);
    const message = errorMsgs.join(". ");

    return next(new AppError(message, 400));
  }
  next();
};

const createUserValidator = [
  body("username").notEmpty().withMessage("Name cannot be empty"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isAlphanumeric()
    .withMessage("Password must contain letters and numbers"),
  body("role").notEmpty().withMessage("The role must be normal or admin"),
  checkResult,
];

const createProductValidator = [
  body("title").notEmpty().withMessage("Title cannot be empty"),
  body("description").notEmpty().withMessage("Description cannot be empty"),
  body("price").isInt().withMessage("Price must be a integer number"),
  body("quantity").isInt().withMessage("Quantity must be a integer number"),
  body("categoryId")
    .isInt()
    .withMessage("Category Id must be a integer number"),
  checkResult,
];

module.exports = { createUserValidator, createProductValidator };
