const { param, body } = require("express-validator");

module.exports.new = [
  body("senderId")
    .notEmpty()
    .withMessage("senderId cant be blank")
    .isInt()
    .withMessage("senderId must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("senderId must be a positive integer");
      }
      return true;
    }),
  body("receiverId")
    .notEmpty()
    .withMessage("receiverId cant be blank")
    .isInt()
    .withMessage("receiverId must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("receiverId must be a positive integer");
      }
      return true;
    }),
  body("points")
    .notEmpty()
    .withMessage("points cant be blank")
    .isInt()
    .withMessage("points must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("points must be a positive integer");
      }
      return true;
    }),
];

module.exports.confirm = [
  body("transferId")
    .notEmpty()
    .withMessage("transferId cant be blank")
    .isInt()
    .withMessage("transferId must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("transferId must be a positive integer");
      }
      return true;
    }),
];

module.exports.getUserPoints = [
  param("id")
    .isInt()
    .withMessage("userId must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("userId must be a positive integer");
      }
      return true;
    }),
];
