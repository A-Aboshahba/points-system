const { param, body } = require("express-validator");

module.exports.login = [
  body("email")
    .notEmpty()
    .withMessage("email cant be blank")
    .isEmail()
    .withMessage("email must be alphapetic"),
  body("password")
    .isString()
    .withMessage("password must be alphapetic")
    .notEmpty()
    .withMessage("password cant be blank"),
];

module.exports.signup = [
  body("name")
    .notEmpty()
    .withMessage("name cant be blank")
    .isString()
    .withMessage("name must be alphapetic"),
  body("password")
    .isString()
    .withMessage("password must be alphapetic")
    .notEmpty()
    .withMessage("password cant be blank"),
  body("email")
    .notEmpty()
    .withMessage("email cant be blank")
    .isEmail()
    .withMessage("enter valid email"),
  body("points").isEmpty().withMessage("cant put user points"),
];
